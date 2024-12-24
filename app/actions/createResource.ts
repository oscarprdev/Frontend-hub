'use server';

import { CreateResourcePayload, createResource } from '../../lib/services/queries/createResource';
import { revalidatePath } from 'next/cache';

export const createResourceAction = async (payload: CreateResourcePayload) => {
	const result = await createResource(payload);

	revalidatePath('/');

	return result;
};
