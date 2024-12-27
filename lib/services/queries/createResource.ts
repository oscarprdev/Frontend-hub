import { DATABASE_URL } from '../../constants';
import { neon } from '@neondatabase/serverless';
import { RESOURCE_CATEGORY } from '~/lib/schemas/resource';
import { Either, errorResponse, successResponse } from '~/lib/utils/either';

export type CreateResourcePayload = {
	id: string;
	title: string;
	description: string;
	url: string;
	imageUrl: string;
	category: RESOURCE_CATEGORY;
};

export async function createResource({
	id,
	title,
	description,
	url,
	imageUrl,
	category,
}: CreateResourcePayload): Promise<Either<string, string>> {
	try {
		const sql = neon(DATABASE_URL);
		await sql(
			`INSERT INTO resources (id, title, description, url, imageUrl, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
			[id, title, description, url, imageUrl, category]
		);

		return successResponse('Resource created successfully');
	} catch {
		return errorResponse('Failed to create resource');
	}
}
