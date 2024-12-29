import { DATABASE_URL } from '../../constants';
import { DbResultError, InputError, OutputError, handleError } from '../errors';
import { mapResourceDbToApplication } from '../mappers/resource';
import { neon } from '@neondatabase/serverless';
import * as v from 'valibot';
import { Resource } from '~/lib/schemas/resource';
import { ResourceDb } from '~/lib/schemas/resource-db';
import { Either, successResponse } from '~/lib/utils/either';

const InputSchema = v.object({
  title: v.string('Title is required'),
});

export async function describeResourceByTitle(
  input: v.InferOutput<typeof InputSchema>
): Promise<Either<string, Resource[]>> {
  try {
    const { title } = validateInput(input);

    const sql = neon(DATABASE_URL);
    const result = await sql(
      `SELECT * FROM resources WHERE LOWER(title) LIKE '%' || ($1) || '%';`,
      [title.toLowerCase()]
    );

    const validResult = validateDbResult(result);

    const resultMapped = validResult.length > 0 ? validResult.map(mapResourceDbToApplication) : [];

    return successResponse(validateOutput(resultMapped));
  } catch (error) {
    return handleError(error, 'Describe Resource By Title');
  }
}

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

const validateDbResult = (result: unknown) => {
  try {
    return v.parse(v.array(ResourceDb), result);
  } catch (error) {
    throw new DbResultError(error instanceof Error ? error.message : 'Db result not valid');
  }
};
