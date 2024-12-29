import * as v from 'valibot';

export const ImageUrl = v.pipe(
  v.string(),
  v.check(
    input => /pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/.test(input),
    'Resource image URL must be a valid URL'
  )
);

export type ImageUrl = v.InferOutput<typeof ImageUrl>;
