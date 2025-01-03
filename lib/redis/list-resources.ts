import { ITEMS_PER_PAGE } from '../constants';
import { RESOURCE_CATEGORY } from '../schemas/category';
import { Resource } from '../schemas/resource';
import { ResourceDb } from '../schemas/resource-db';
import { InputError, OutputError, RedisError, handleError } from '../services/errors';
import { handleResourcesDb } from '../services/mappers/resource';
import { Either, successResponse } from '../utils/either';
import { redis } from './client';
import * as v from 'valibot';

const ListResourcesCachedInputSchema = v.object({
  items: v.optional(v.number()),
  category: v.optional(v.enum(RESOURCE_CATEGORY)),
});

export async function listResourcesCached(
  input: v.InferOutput<typeof ListResourcesCachedInputSchema>
): Promise<Either<string, Resource[]>> {
  try {
    const { category, items } = validateListResourcesInput(input);
    const itemsPerPage = items ?? ITEMS_PER_PAGE;

    let result: Resource[];
    if (category) {
      const response = await redis.get(category);
      if (!response) throw new RedisError(`Error getting resource with category: ${category}`);

      result = JSON.parse(response);
    } else {
      const response = await Promise.all(
        Object.values(RESOURCE_CATEGORY).map(cat => redis.get(cat))
      );
      if (!response) throw new RedisError(`Error getting resources`);
      result = response
        .map(res => {
          if (!res) throw new RedisError(`Error getting resource`);
          return JSON.parse(res);
        })
        .flat();
    }

    const resultPaginated = result.splice(0, itemsPerPage);

    const validResult = validateOutput(resultPaginated as unknown as ResourceDb[]);

    return successResponse(handleResourcesDb(validResult));
  } catch (error) {
    return handleError(error, 'List resources cached');
  }
}

const validateListResourcesInput = (
  input: v.InferOutput<typeof ListResourcesCachedInputSchema>
) => {
  try {
    return v.parse(ListResourcesCachedInputSchema, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};

const validateOutput = (output: ResourceDb[]) => {
  try {
    return v.parse(
      v.array(ResourceDb),
      output.map(out => ({
        ...out,
        updatedat: new Date(out.updatedat),
        createdat: new Date(out.createdat),
      }))
    );
  } catch (error) {
    throw new OutputError(error instanceof Error ? error.message : 'Output not valid');
  }
};
