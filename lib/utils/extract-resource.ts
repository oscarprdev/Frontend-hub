import { RESOURCE_CATEGORY } from '../schemas/category';
import { Resource } from '../schemas/resource';
import { errorResponse, successResponse } from './either';
import * as v from 'valibot';

export const extractResource = (id: string, formData: FormData) => {
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
		const parsedResource = v.parse(Resource, resource);
		return successResponse(parsedResource);
	} catch {
		return errorResponse(`Error parsing Resource`);
	}
};
