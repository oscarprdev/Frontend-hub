'use server';

import { listResourcesFavs } from '~/lib/services/queries/listResources';

export const listResourcesFavsAction = async (favs: string[]) => {
  return await listResourcesFavs({ favs });
};
