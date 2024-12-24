import { DATABASE_URL } from '../../constants';
import { neon } from '@neondatabase/serverless';

export type DeleteResourcePayload = {
	resourceId: string;
};

export async function deleteResource({ resourceId }: DeleteResourcePayload) {
	const sql = neon(DATABASE_URL);
	const result = await sql(`DELETE FROM resources WHERE id = ($1);`, [resourceId]);

	return result;
}
