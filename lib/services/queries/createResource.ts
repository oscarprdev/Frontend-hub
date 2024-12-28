import { DATABASE_URL } from '../../constants';
import { InputError, handleError } from '../errors';
import { neon } from '@neondatabase/serverless';
import * as v from 'valibot';
import { Resource } from '~/lib/schemas/resource';
import { Either, successResponse } from '~/lib/utils/either';

export async function createResource(input: Resource): Promise<Either<string, string>> {
	try {
		const { id, title, description, url, imageUrl, category } = validateInput(input);

		const sql = neon(DATABASE_URL);
		await sql(
			`INSERT INTO resources (id, title, description, url, imageUrl, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
			[id, title, description, url, imageUrl, category]
		);

		return successResponse('Resource created successfully');
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
