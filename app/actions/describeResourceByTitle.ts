'use server';

import { Effect } from 'effect';
import { describeByTitle } from '~/lib/effects/resources/describe';
import { Resource } from '~/lib/types/resources';

export const describeResourceByTitleAction = async ({
	title,
}: {
	title: string;
}): Promise<Resource[]> =>
	Effect.runPromise(describeByTitle(title)).then(result => {
		if (typeof result === 'string') return [];

		return result;
	});
