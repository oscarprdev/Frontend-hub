'use server';

import { deleteResource } from '../../lib/services/queries/deleteResource';
import { revalidatePath } from 'next/cache';

export const deleteResourceAction = async ({ resourceId }: { resourceId: string }) => {
    const result = await deleteResource({ resourceId });

    revalidatePath('/');

    return result;
};
