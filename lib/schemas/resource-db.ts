import { Category } from './category';
import { Description } from './description';
import { Id } from './id';
import { ImageUrl } from './image-url';
import { Title } from './title';
import { URL } from './url';
import * as v from 'valibot';

export const ResourceDb = v.object({
  id: Id,
  title: Title,
  description: Description,
  url: URL,
  imageurl: ImageUrl,
  category: Category,
  updatedat: v.date('Resource updated at must be a valid date'),
  createdat: v.date('Resource created at must be a valid date'),
});

export type ResourceDb = v.InferOutput<typeof ResourceDb>;
