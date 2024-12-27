'use server';

import { redirect } from 'next/navigation';
import { editResource } from '~/lib/services/queries/editResource';
import { RESOURCE_CATEGORY, Resource } from '~/lib/types/resources';

export const editResourceAction = async (
    initialState: { message: string; id?: string },
    formData: FormData
) => {
    if (!initialState.id) return { message: 'Resource Id is required' };

    const id = initialState.id;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const url = formData.get('url') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const category = formData.get('category') as RESOURCE_CATEGORY;

    const resource = {
        id,
        title,
        description,
        url,
        imageUrl,
        category,
    } satisfies Resource;

    try {
        await editResource(resource);
    } catch (error) {
        console.error(error);
        return { message: 'Failed to edit resource' };
    }

    redirect('/');
};
