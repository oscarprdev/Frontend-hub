import { DATABASE_URL } from '../../constants';
import { InputError, OutputError, handleError } from '../errors';
import { neon } from '@neondatabase/serverless';
import * as v from 'valibot';
import { Resource } from '~/lib/schemas/resource';
import { ResourceDb } from '~/lib/schemas/resource-db';
import { Either, successResponse } from '~/lib/utils/either';

export async function createResource(input: Resource): Promise<Either<string, ResourceDb>> {
  try {
    const { id, title, description, url, imageUrl, category } = validateInput(input);

    const sql = neon(DATABASE_URL);
    const result = await sql(
      `INSERT INTO resources (id, title, description, url, imageUrl, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      [id, title, description, url, imageUrl, category]
    );

    return successResponse(validateOutput(result[0]));
  } catch (error) {
    return handleError(error, 'Create Resource');
  }
}

const validateInput = (input: Resource) => {
  try {
    return v.parse(Resource, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};

const validateOutput = (input: unknown) => {
  try {
    return v.parse(ResourceDb, input);
  } catch (error) {
    throw new OutputError(error instanceof Error ? error.message : 'Db result not valid');
  }
};
