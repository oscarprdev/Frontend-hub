'use server';

import { redirect } from 'next/navigation';
import { auth } from '~/auth';
import { editCacheResource } from '~/lib/redis/edit-resource';
import { editResource } from '~/lib/services/queries/editResource';
import { isError } from '~/lib/utils/either';
import { extractResource } from '~/lib/utils/extract-resource';

export const editResourceAction = async (
  initialState: { message: string; id?: string },
  formData: FormData
) => {
  const session = await auth();
  if (!session?.user) return { message: 'Not authorized' };

  if (!initialState.id) return { message: 'Resource Id is required' };

  const id = initialState.id;
  const parsedResponse = extractResource(id, formData);
  if (isError(parsedResponse)) {
    return { message: parsedResponse.error };
  }

  const response = await editResource(parsedResponse.success);
  if (isError(response)) {
    return { message: response.error };
  }

  const cacheResponse = await editCacheResource(response.success);
  if (isError(cacheResponse)) {
    return { message: cacheResponse.error };
  }

  redirect('/');
};
