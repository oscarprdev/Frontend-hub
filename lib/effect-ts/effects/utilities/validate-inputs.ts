import { MissingTitleError } from '../../errors';
import { DescribeResourceByTitleInput } from '../../schemas';
import { Effect, Either, Schema } from 'effect';

export const validateInputEffect = Effect.gen(function* () {
	return (title: string) => {
		const response = Schema.validateEither(DescribeResourceByTitleInput)({ title });
		if (Either.isLeft(response)) {
			return Either.left(new MissingTitleError({ message: 'Title is required' }));
		}

		return Either.right(response.right);
	};
});
