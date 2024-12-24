import { DATABASE_URL } from '../../constants';
import { Resource, ResourceInfra } from '../../types/resources';
import { mapResourceInfraToApplication } from '../mappers/resource';
import { neon } from '@neondatabase/serverless';

export type DescribeResourcePayload = {
	resourceId: string;
};

export async function describeResource({ resourceId }: DescribeResourcePayload): Promise<Resource> {
	const sql = neon(DATABASE_URL);
	const result = await sql(`SELECT * FROM resources WHERE id = ($1);`, [resourceId]);

	return result[0] as Resource;
}

export async function describeResourceByTitle({ title }: { title: string }): Promise<Resource[]> {
	if (!title) return [];

	const sql = neon(DATABASE_URL);
	const result = await sql(`SELECT * FROM resources WHERE LOWER(title) LIKE '%' || ($1) || '%';`, [
		title.toLowerCase(),
	]);

	return result.length > 0
		? (result as ResourceInfra[]).map(res => mapResourceInfraToApplication(res))
		: [];
}
