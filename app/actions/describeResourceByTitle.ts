'use server';

import { Effect } from 'effect';
import { describeByTitle } from '~/lib/effect-ts/layers/describe-resource';
import { Resource } from '~/lib/effect-ts/schemas';

export const describeResourceByTitleAction = async ({
	title,
}: {
	title: string;
}): Promise<Resource[] | string> =>
	Effect.runPromise(describeByTitle(title)).then(result => {
		return result;
	});
