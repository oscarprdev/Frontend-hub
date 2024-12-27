import { DATABASE_URL } from '../../constants';
import { RESOURCE_CATEGORY, Resource } from '../../types/resources';
import { neon } from '@neondatabase/serverless';

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
}: EditResourcePayload): Promise<Resource> {
    const sql = neon(DATABASE_URL);
    const result = await sql(
        `UPDATE resources SET title = $2, description = $3, url = $4, imageUrl = $5, category = $6 WHERE id = $1 RETURNING *;`,
        [id, title, description, url, imageUrl, category]
    );

    return result[0] as Resource;
}
