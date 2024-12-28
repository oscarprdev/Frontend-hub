import { Category } from './category';
import { Description } from './description';
import { Id } from './id';
import { ImageUrl } from './image-url';
import { Title } from './title';
import { URL } from './url';
import * as v from 'valibot';



export const Resource = v.object({
	id: Id,
	title: Title,
	description: Description,
	url: URL,
	imageUrl: ImageUrl,
	category: Category,
	updatedAt: v.optional(v.string('Resource updated at must be a string')),
});

export type Resource = v.InferOutput<typeof Resource>;
