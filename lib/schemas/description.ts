import * as v from 'valibot';

export const Description = v.string('Resource description must be a string');

export type Description = v.InferOutput<typeof Description>;
