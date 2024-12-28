import * as v from 'valibot';

export const Id = v.pipe(v.string(), v.uuid('Resource ID must be a UUID'));

export type Id = v.InferOutput<typeof Id>;
