'use server';

import { listCachedResourcesFavs } from '~/lib/redis/list-resources-favs';
import { listResourcesFavs } from '~/lib/services/queries/listResources';
import { isError } from '~/lib/utils/either';

export const listResourcesFavsAction = async (favs: string[]) => {
  const result = await listCachedResourcesFavs({ favs });
  if (!isError(result)) return result;

  return await listResourcesFavs({ favs });
};
