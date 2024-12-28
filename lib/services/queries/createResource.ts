import { DATABASE_URL } from '../../constants';
import { InputError, handleError } from '../errors';
import { neon } from '@neondatabase/serverless';
import * as v from 'valibot';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';
import { Either, successResponse } from '~/lib/utils/either';

const InputSchema = v.object({
	id: v.string('Id is required'),
	title: v.string('Title is required'),
	description: v.string('Description is required'),
	url: v.string('URL is required'),
	imageUrl: v.string('imageURL is required'),
	category: v.enum(RESOURCE_CATEGORY),
});

export async function createResource(
	input: v.InferOutput<typeof InputSchema>
): Promise<Either<string, string>> {
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

const validateInput = (input: v.InferOutput<typeof InputSchema>) => {
	try {
		return v.parse(InputSchema, input);
	} catch (error) {
		throw new InputError(error instanceof Error ? error.message : 'Input not valid');
	}
};
