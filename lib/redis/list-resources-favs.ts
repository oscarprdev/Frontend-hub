import { RESOURCE_CATEGORY } from '../schemas/category';
import { Resource } from '../schemas/resource';
import { ResourceDb } from '../schemas/resource-db';
import { InputError, OutputError, handleError } from '../services/errors';
import { mapResourceDbToApplication } from '../services/mappers/resource';
import { Either, successResponse } from '../utils/either';
import { redis } from './client';
import * as v from 'valibot';

const InputSchema = v.object({
  favs: v.array(v.string()),
});

export const listCachedResourcesFavs = async (
  input: v.InferOutput<typeof InputSchema>
): Promise<Either<string, Resource[]>> => {
  try {
    const { favs } = validateInput(input);

    const all = await Promise.all(Object.values(RESOURCE_CATEGORY).map(cat => redis.get(cat)));
    const resources = all.map(res => JSON.parse(res as string) as ResourceDb[]).flat();

    const result = resources.filter(res => favs.includes(res.id));

    return successResponse(
      validateOutput(
        result.map(res =>
          mapResourceDbToApplication({
            ...res,
            updatedat: new Date(res.updatedat),
            createdat: new Date(res.createdat),
          })
        )
      )
    );
  } catch (error) {
    return handleError(error, 'listing cached resources favs');
  }
};

const validateInput = (input: v.InferOutput<typeof InputSchema>) => {
  try {
    return v.parse(InputSchema, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};

const validateOutput = (input: Resource[]) => {
  try {
    return v.parse(v.array(Resource), input);
  } catch (error) {
    throw new OutputError(error instanceof Error ? error.message : 'Output result not valid');
  }
};
