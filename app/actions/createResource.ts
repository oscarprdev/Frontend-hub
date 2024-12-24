'use server';

import { createResource } from '../../lib/services/queries/createResource';
import { redirect } from 'next/navigation';
import { RESOURCE_CATEGORY, Resource } from '~/lib/types/resources';

export const createResourceAction = async (_: unknown, formData: FormData) => {
	const id = crypto.randomUUID();
	const title = formData.get('title') as string;
	const description = formData.get('description') as string;
	const url = formData.get('url') as string;
	const imageUrl = formData.get('imageUrl') as string;
	const category = formData.get('category') as RESOURCE_CATEGORY;

	const resource = {
		id,
		title,
		description,
		url,
		imageUrl,
		category,
	} satisfies Resource;

	try {
		await createResource(resource);
	} catch (error) {
		console.error(error);
		return { message: 'Failed to create resource' };
	}

	redirect('/');
};
