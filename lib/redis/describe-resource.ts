import { RESOURCE_CATEGORY } from '../schemas/category';
import { Resource } from '../schemas/resource';
import { ResourceDb } from '../schemas/resource-db';
import { InputError, OutputError, handleError } from '../services/errors';
import { mapResourceDbToApplication } from '../services/mappers/resource';
import { successResponse } from '../utils/either';
import { redis } from './client';
import * as v from 'valibot';

const InputSchema = v.object({
  title: v.string('Title is required'),
});

export const describeCachedResourceBySearch = async (input: v.InferOutput<typeof InputSchema>) => {
  try {
    const { title } = validateInput(input);

    const all = await Promise.all(Object.values(RESOURCE_CATEGORY).map(cat => redis.get(cat)));
    const resources = all.map(res => JSON.parse(res as string) as ResourceDb[]).flat();

    const resourcesSearched = resources.filter(res =>
      res.title.toLowerCase().match(title.toLowerCase())
    );

    return successResponse(
      validateOutput(
        resourcesSearched.map(res =>
          mapResourceDbToApplication({
            ...res,
            updatedat: new Date(res.updatedat),
            createdat: new Date(res.createdat),
          })
        )
      )
    );
  } catch (error) {
    return handleError(error, 'describe cached resource by search');
  }
};

const validateInput = (input: v.InferOutput<typeof InputSchema>) => {
  try {
    return v.parse(InputSchema, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};

const validateOutput = (output: unknown) => {
  try {
    return v.parse(v.array(Resource), output);
  } catch (error) {
    throw new OutputError(error instanceof Error ? error.message : 'Output not valid');
  }
};
