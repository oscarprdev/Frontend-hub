import * as v from 'valibot';

export enum RESOURCE_CATEGORY {
  UI_LIBRARY = 'UI_LIBRARY',
  FONTS = 'FONTS',
  ICONS = 'ICONS',
  AUTH = 'AUTH',
  ANIMATIONS = 'ANIMATIONS',
  UTILITIES = 'UTILITIES',
  DATABASES = 'DATABASES',
  BLOGS = 'BLOGS',
}

export const Category = v.enum(RESOURCE_CATEGORY, 'Resource category must be a valid category');

export type Category = v.InferOutput<typeof Category>;
