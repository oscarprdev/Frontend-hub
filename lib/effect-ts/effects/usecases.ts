import { DescribeResourceByTitleInfra } from '../services/describe-resource.service';
import { HandleResourcesDb } from '../services/utils.services';
import { Effect } from 'effect';

export const describeResourceByTitleUsecaseEffect = Effect.gen(function* () {
	const implementation = yield* DescribeResourceByTitleInfra;
	const handleResourceDb = yield* HandleResourcesDb;

	return {
		execute: (title: string) =>
			Effect.gen(function* () {
				const response = yield* implementation.execute(title);
				return yield* handleResourceDb(response);
			}),
	};
});
