import { DATABASE_URL } from '../../constants';
import { RESOURCE_CATEGORY, Resource } from '../../types/resources';
import { neon } from '@neondatabase/serverless';

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
}: CreateResourcePayload): Promise<Resource> {
	const sql = neon(DATABASE_URL);
	const result = await sql(
		`INSERT INTO resources (id, title, description, url, imageUrl, category) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
		[id, title, description, url, imageUrl, category]
	);

	return result[0] as Resource;
}
