import { Resource } from '../schemas/resource';
import { InputError, handleError } from '../services/errors';
import { redis } from './client';
import * as v from 'valibot';

export const addCacheResource = async (input: Resource) => {
  try {
    const resource = validateInput(input);

    await redis.set(resource.category, JSON.stringify(resource));
  } catch (error) {
    handleError(error, 'add cache resource');
  }
};

const validateInput = (input: Resource) => {
  try {
    return v.parse(Resource, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};
