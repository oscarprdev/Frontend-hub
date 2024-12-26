import { NeonQueryError } from '../errors';
import { DatabaseService } from '../services/database.service';
import { ValidateInput } from '../services/describe-resource.service';
import { Effect } from 'effect';

export const describeResourceByTitleInfraEffect = Effect.gen(function* () {
	const dbService = yield* DatabaseService;
	const validateInput = yield* ValidateInput;

	return {
		execute: (input: string) =>
			Effect.gen(function* () {
				const { title } = yield* validateInput(input);

				return yield* Effect.tryPromise({
					try: () =>
						dbService(`SELECT * FROM resources WHERE LOWER(title) LIKE '%' || ($1) || '%';`, [
							title.toLowerCase(),
						]),
					catch: (error: unknown) => new NeonQueryError({ message: error as string }),
				});
			}),
	};
});
