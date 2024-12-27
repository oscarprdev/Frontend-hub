'use server';

import { Effect } from 'effect';
import { describeResourceBySearch } from '~/lib/effect-ts/layers/describe-resource';
import { DescribeResourceBySearchInput, Resource } from '~/lib/effect-ts/schemas';

export const describeResourceBySearchAction = async (
    input: typeof DescribeResourceBySearchInput.Encoded
): Promise<Resource[] | string> =>
    Effect.runPromise(describeResourceBySearch(input)).then(result => {
        return result;
    });
