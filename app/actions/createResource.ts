'use server';

import { createResource } from '../../lib/services/queries/createResource';
import { redirect } from 'next/navigation';
import { isError } from '~/lib/utils/either';
import { extractResource } from '~/lib/utils/extract-resource';

export const createResourceAction = async (_: unknown, formData: FormData) => {
  const id = crypto.randomUUID();

  const parsedResponse = extractResource(id, formData);
  if (isError(parsedResponse)) {
    return { message: parsedResponse.error };
  }

  const response = await createResource(parsedResponse.success);
  if (isError(response)) {
    return { message: response.error };
  }

  redirect('/');
};
