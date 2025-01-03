import { ResourceDb } from '../schemas/resource-db';
import { InputError, RedisError, handleError } from '../services/errors';
import { Either, successResponse } from '../utils/either';
import { redis } from './client';
import * as v from 'valibot';

export const addCacheResource = async (input: ResourceDb): Promise<Either<string, string>> => {
  try {
    const resource = validateInput(input);

    const cachedResources = await redis.get(resource.category);
    if (!cachedResources)
      throw new RedisError(`Error getting resource with category: ${resource.category}`);

    const updatedResources = [resource, ...JSON.parse(cachedResources)];
    await redis.set(resource.category, JSON.stringify(updatedResources));

    return successResponse('Resource successfully added to cache ');
  } catch (error) {
    return handleError(error, 'add cache resource');
  }
};

const validateInput = (input: ResourceDb) => {
  try {
    return v.parse(ResourceDb, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};
