import { Schema } from 'effect';

export const URL = Schema.String.annotations({
    identifier: 'URL',
    missingMessage: 'URL is required',
});

export type URL = Schema.Schema.Type<typeof URL>;
