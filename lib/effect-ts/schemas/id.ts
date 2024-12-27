import { Schema } from 'effect';

export const Id = Schema.UUID.annotations({
    identifier: 'id',
    missingMessage: 'Id is required',
});

export type Id = Schema.Schema.Type<typeof Id>;
