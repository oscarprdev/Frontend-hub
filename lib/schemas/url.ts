import * as v from 'valibot';

export const URL = v.string('Resource URL must be a valid URL');

export type URL = v.InferOutput<typeof URL>;
