'use server';

import { describeResourceByTitle } from '~/lib/services/queries/describeResource';
import { Resource } from '~/lib/types/resources';

export const describeResourceByTitleAction = async ({
	title,
}: {
	title: string;
}): Promise<Resource[]> => {
	return await describeResourceByTitle({ title });
};
