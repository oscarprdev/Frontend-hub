import { Schema } from 'effect';

export const UpdatedAt = Schema.ValidDateFromSelf.annotations({
    identifier: 'UpdatedAt',
    missingMessage: 'UpdatedAt is required',
});

export type UpdatedAt = Schema.Schema.Type<typeof UpdatedAt>;

export const UpdatedAtStr = Schema.NonEmptyString.annotations({
    identifier: 'UpdatedAt',
    missingMessage: 'UpdatedAt is required',
});

export type UpdatedAtStr = Schema.Schema.Type<typeof UpdatedAtStr>;
