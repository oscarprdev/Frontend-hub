'use server';

import { redirect } from 'next/navigation';
import { editResource } from '~/lib/services/queries/editResource';
import { isError } from '~/lib/utils/either';
import { extractResource } from '~/lib/utils/extract-resource';

export const editResourceAction = async (
  initialState: { message: string; id?: string },
  formData: FormData
) => {
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

  redirect('/');
};
