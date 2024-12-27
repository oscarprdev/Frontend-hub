import { Schema } from 'effect';

export const Title = Schema.NonEmptyString.annotations({
    identifier: 'Title',
    missingMessage: 'Title is required',
});

export type Title = Schema.Schema.Type<typeof Title>;
