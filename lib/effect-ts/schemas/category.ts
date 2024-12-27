import { Schema } from 'effect';

export enum RESOURCE_CATEGORY {
    FRONTEND = 'FRONTEND',
    BACKEND = 'BACKEND',
}

export const Category = Schema.Enums(RESOURCE_CATEGORY).annotations({
    identifier: 'category',
    missingMessage: 'Category is required',
});

export type Category = Schema.Schema.Type<typeof Category>;
