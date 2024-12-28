'use server';

import { Resource } from '~/lib/schemas/resource';
import { describeResourceByTitle } from '~/lib/services/queries/describeResource';
import { Either } from '~/lib/utils/either';

export const describeResourceByTitleAction = async ({
	title,
}: {
	title: string;
}): Promise<Either<string, Resource[]>> => {
	return await describeResourceByTitle({ title });
};
