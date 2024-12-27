import { Schema } from 'effect';

export const ImageURL = Schema.TemplateLiteral(
    'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/',
    Schema.String
).annotations({
    identifier: 'ImageURL',
    missingMessage: 'ImageURL is required',
});

export type ImageURL = Schema.Schema.Type<typeof ImageURL>;
