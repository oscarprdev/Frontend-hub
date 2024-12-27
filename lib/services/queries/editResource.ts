import { DATABASE_URL } from '../../constants';
import { neon } from '@neondatabase/serverless';
import * as v from 'valibot';
import { RESOURCE_CATEGORY, Resource } from '~/lib/schemas/resource';
import { Either, errorResponse, isError, successResponse } from '~/lib/utils/either';

export type EditResourcePayload = {
	id: string;
	title: string;
	description: string;
	url: string;
	imageUrl: string;
	category: RESOURCE_CATEGORY;
};

export async function editResource({
	id,
	title,
	description,
	url,
	imageUrl,
	category,
}: EditResourcePayload): Promise<Either<string, Resource>> {
	try {
		const sql = neon(DATABASE_URL);
		const result = await sql(
			`UPDATE resources SET title = $2, description = $3, url = $4, imageUrl = $5, category = $6 WHERE id = $1 RETURNING *;`,
			[id, title, description, url, imageUrl, category]
		);

		const validResource = validateResourceOutput(result);
		if (isError(validResource)) {
			return errorResponse(validResource.error);
		}

		return successResponse(validResource.success);
	} catch {
		return errorResponse('Failed to create resource');
	}
}

const validateResourceOutput = (resource: unknown): Either<string, Resource> => {
	try {
		const validResource = v.parse(Resource, resource);
		return successResponse(validResource);
	} catch {
		return errorResponse('Failed to validate resource');
	}
};
