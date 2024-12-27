import { Schema } from 'effect';

export const CreatedAt = Schema.ValidDateFromSelf.annotations({
    identifier: 'CreatedAt',
    missingMessage: 'CreatedAt is required',
});

export type CreatedAt = Schema.Schema.Type<typeof CreatedAt>;
