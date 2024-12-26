import { DecodeResourcesDb, FormatResource } from '../../services/utils.services';
import { Effect } from 'effect';

export const handleResourceDbEffect = Effect.gen(function* () {
	const decodeResourcesDb = yield* DecodeResourcesDb;
	const formatResource = yield* FormatResource;

	return (input: unknown) =>
		Effect.gen(function* () {
			const response = yield* decodeResourcesDb(input);
			return response.map(formatResource);
		});
});
