import { Schema } from 'effect';

export const Description = Schema.NonEmptyString.annotations({
    identifier: 'Description',
    missingMessage: 'Description is required',
});

export type Description = Schema.Schema.Type<typeof Description>;
