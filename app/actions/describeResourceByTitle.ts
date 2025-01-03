'use server';

import { describeCachedResourceBySearch } from '~/lib/redis/describe-resource';
import { Resource } from '~/lib/schemas/resource';
import { describeResourceByTitle } from '~/lib/services/queries/describeResource';
import { Either, isError } from '~/lib/utils/either';

export const describeResourceByTitleAction = async ({
  title,
}: {
  title: string;
}): Promise<Either<string, Resource[]>> => {
  const cachedResult = await describeCachedResourceBySearch({ title });
  if (!isError(cachedResult)) return cachedResult;

  return await describeResourceByTitle({ title });
};
