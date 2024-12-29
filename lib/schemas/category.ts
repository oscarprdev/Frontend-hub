import * as v from 'valibot';

export enum RESOURCE_CATEGORY {
  FRONTEND = 'FRONTEND',
  BACKEND = 'BACKEND',
}

export const Category = v.enum(RESOURCE_CATEGORY, 'Resource category must be a valid category');

export type Category = v.InferOutput<typeof Category>;
