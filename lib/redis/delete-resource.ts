import { RESOURCE_CATEGORY } from '../schemas/category';
import { ResourceDb } from '../schemas/resource-db';
import { InputError, RedisError, handleError } from '../services/errors';
import { Either, successResponse } from '../utils/either';
import { redis } from './client';
import * as v from 'valibot';

const InputSchema = v.object({
  resourceId: v.string('resourceId is required'),
  category: v.enum(RESOURCE_CATEGORY),
});

export const deleteCacheResource = async (
  input: v.InferOutput<typeof InputSchema>
): Promise<Either<string, string>> => {
  try {
    const { resourceId, category } = validateInput(input);

    // Get cached resources by category
    const cachedResources = await redis.get(category);
    if (!cachedResources) throw new RedisError(`Error getting resource with category: ${category}`);

    const cachedResourcesParsed = JSON.parse(cachedResources) as ResourceDb[];

    const index = cachedResourcesParsed.findIndex(res => res.id === resourceId);
    if (index < 0) throw new Error('Resource to delete not found by index');

    // Delete resource from array
    cachedResourcesParsed.splice(index, 1);

    // Update cached resources
    await redis.set(category, JSON.stringify(cachedResourcesParsed));

    return successResponse('Resource successfully deleted from cache ');
  } catch (error) {
    return handleError(error, 'delete cache resource');
  }
};

const validateInput = (input: v.InferOutput<typeof InputSchema>) => {
  try {
    return v.parse(InputSchema, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};
