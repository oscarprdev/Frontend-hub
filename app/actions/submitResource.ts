'use server';

import { ActionResponse } from '../../lib/types/action-response';
import { Resource } from '../../lib/types/resources';
import { createResourceAction } from './createResource';

export const submitResourceAction = async (
	_: ActionResponse<Resource>,
	resource: Resource
): Promise<ActionResponse<Resource>> => {
	try {
		await createResourceAction(resource);

		return {
			success: true,
			errors: null,
			state: resource,
			message: 'Resource submitted successfully',
		} satisfies ActionResponse<Resource>;
	} catch {
		return {
			success: false,
			errors: null,
			state: null,
			message: 'Something went wrong',
		} satisfies ActionResponse<Resource>;
	}
};
