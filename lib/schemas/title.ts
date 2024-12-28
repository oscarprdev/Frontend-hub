import * as v from 'valibot';

export const Title = v.string('Resource title must be a string');

export type Title = v.InferOutput<typeof Title>;
