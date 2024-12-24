import { DATABASE_URL } from '../../constants';
import { Resource } from '../../types/resources';
import { neon } from '@neondatabase/serverless';

export type DescribeResourcePayload = {
	resourceId: string;
};

export async function describeResource({ resourceId }: DescribeResourcePayload): Promise<Resource> {
	const sql = neon(DATABASE_URL);
	const result = await sql(`SELECT * FROM resources WHERE id = ($1);`, [resourceId]);

	return result[0] as Resource;
}
