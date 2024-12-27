'use server';

import { Resource } from '~/lib/schemas/resource';
import { describeResourceByTitle } from '~/lib/services/queries/describeResource';

export const describeResourceByTitleAction = async ({
	title,
}: {
	title: string;
}): Promise<Resource[]> => {
	return await describeResourceByTitle({ title });
};
