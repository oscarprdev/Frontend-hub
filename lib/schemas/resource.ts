import { ImageUrl } from './image-url';
import * as v from 'valibot';

export enum RESOURCE_CATEGORY {
	FRONTEND = 'FRONTEND',
	BACKEND = 'BACKEND',
}

export const Resource = v.object({
	id: v.pipe(v.string(), v.uuid('Resource ID must be a UUID')),
	title: v.string('Resource title must be a string'),
	description: v.string('Resource description must be a string'),
	url: v.pipe(v.string(), v.url('Resource URL must be a valid URL')),
	imageUrl: ImageUrl,
	category: v.enum(RESOURCE_CATEGORY, 'Resource category must be a valid category'),
	updatedAt: v.optional(v.string('Resource updated at must be a string')),
});

export type Resource = v.InferOutput<typeof Resource>;
