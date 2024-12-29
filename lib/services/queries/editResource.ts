import { DATABASE_URL } from '../../constants';
import { DbResultError, InputError, OutputError, handleError } from '../errors';
import { handleResourcesDb } from '../mappers/resource';
import { neon } from '@neondatabase/serverless';
import * as v from 'valibot';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';
import { Resource } from '~/lib/schemas/resource';
import { ResourceDb } from '~/lib/schemas/resource-db';
import { Either, successResponse } from '~/lib/utils/either';

const InputSchema = v.object({
  id: v.string('Id is required'),
  title: v.string('Title is required'),
  description: v.string('Description is required'),
  url: v.string('URL is required'),
  imageUrl: v.string('imageURL is required'),
  category: v.enum(RESOURCE_CATEGORY),
});

export async function editResource(
  input: v.InferOutput<typeof InputSchema>
): Promise<Either<string, Resource>> {
  try {
    const { id, title, description, url, imageUrl, category } = validateInput(input);

    const sql = neon(DATABASE_URL);
    const result = await sql(
      `UPDATE resources SET title = $2, description = $3, url = $4, imageUrl = $5, category = $6 WHERE id = $1 RETURNING *;`,
      [id, title, description, url, imageUrl, category]
    );

    const validResult = validateResourcesDbResult(result);
    const resourceMapped = handleResourcesDb(validResult);

    return successResponse(validateOutput(resourceMapped[0]));
  } catch (error) {
    return handleError(error, `Edit resource`);
  }
}

const validateInput = (input: v.InferOutput<typeof InputSchema>) => {
  try {
    return v.parse(InputSchema, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};

const validateResourcesDbResult = (input: unknown) => {
  try {
    return v.parse(v.array(ResourceDb), input);
  } catch (error) {
    throw new DbResultError(error instanceof Error ? error.message : 'Db result not valid');
  }
};

const validateOutput = (output: unknown) => {
  try {
    return v.parse(Resource, output);
  } catch (error) {
    throw new OutputError(error instanceof Error ? error.message : 'Output not valid');
  }
};
