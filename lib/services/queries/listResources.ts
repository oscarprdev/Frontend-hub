import { DATABASE_URL } from '../../constants';
import { RESOURCE_CATEGORY, Resource, ResourceInfra } from '../../types/resources';
import { mapResourceInfraToApplication } from '../mappers/resource';
import { neon } from '@neondatabase/serverless';

export type ListResourcesPayload = {
	category?: RESOURCE_CATEGORY;
};

function returnResourcesList(result: ResourceInfra[]): Resource[] {
	return result.length > 0 ? result.map(res => mapResourceInfraToApplication(res)) : [];
}

export async function listResources({ category }: ListResourcesPayload): Promise<Resource[]> {
	const sql = neon(DATABASE_URL);
	let result = [];
	if (!category) {
		result = await sql(`SELECT * FROM resources ORDER BY updatedat DESC;`);
	} else {
		result = await sql(`SELECT * FROM resources WHERE category = ($1) ORDER BY updatedat DESC;`, [
			category,
		]);
	}

	return returnResourcesList(result as ResourceInfra[]);
}

export async function listResourcesByCategory({
	category,
}: ListResourcesPayload): Promise<Resource[]> {
	if (!category) {
		throw new Error('Category is required');
	}

	if (!Object.values(RESOURCE_CATEGORY).includes(category)) {
		throw new Error('Invalid category');
	}

	const sql = neon(DATABASE_URL);
	const result = await sql(
		`SELECT title, url FROM resources WHERE category = ($1) ORDER BY updatedat DESC;`,
		[category]
	);

	return returnResourcesList(result as ResourceInfra[]);
}
