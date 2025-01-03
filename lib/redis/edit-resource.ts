import { ResourceDb } from '../schemas/resource-db';
import { InputError, RedisError, handleError } from '../services/errors';
import { Either, successResponse } from '../utils/either';
import { redis } from './client';
import * as v from 'valibot';

export const editCacheResource = async (input: ResourceDb): Promise<Either<string, string>> => {
  try {
    const resource = validateInput(input);

    const cachedResources = await redis.get(resource.category);
    if (!cachedResources)
      throw new RedisError(`Error getting resource with category: ${resource.category}`);

    const resourcesParsed = JSON.parse(cachedResources) as ResourceDb[];
    const resourceIndexToUpdate = resourcesParsed.findIndex(res => res.id === resource.id);

    resourcesParsed.splice(resourceIndexToUpdate, 1, resource);

    await redis.set(resource.category, JSON.stringify(resourcesParsed));

    return successResponse('Resource successfully editted from cache db');
  } catch (error) {
    return handleError(error, 'edit cache resource');
  }
};

const validateInput = (input: ResourceDb) => {
  try {
    return v.parse(ResourceDb, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};
