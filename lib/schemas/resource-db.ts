import { ImageUrl } from './image-url';
import { Resource } from './resource';
import * as v from 'valibot';

export const ResourceDb = v.object({
	...Resource.entries,
	imageurl: ImageUrl,
	updatedat: v.date('Resource updated at must be a valid date'),
	createdat: v.date('Resource created at must be a valid date'),
});

export type ResourceDb = v.InferOutput<typeof ResourceDb>;
