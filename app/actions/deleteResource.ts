'use server';

import { deleteResource } from '../../lib/services/queries/deleteResource';
import { revalidatePath } from 'next/cache';
import { deleteCacheResource } from '~/lib/redis/delete-resource';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';
import { isError } from '~/lib/utils/either';

export const deleteResourceAction = async ({
  resourceId,
  category,
}: {
  resourceId: string;
  category: RESOURCE_CATEGORY;
}) => {
  const response = await deleteResource({ resourceId });
  if (isError(response)) return response;

  const cacheResponse = await deleteCacheResource({ resourceId, category });
  if (isError(cacheResponse)) return cacheResponse;

  revalidatePath('/');

  return cacheResponse;
};
