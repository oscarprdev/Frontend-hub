import { Data, Effect } from 'effect';

export class NeonQueryError extends Data.TaggedError('NeonQueryError')<{
	message: string;
}> {}

export class MissingTitleError extends Data.TaggedError('MissingTitleError')<{
	message: string;
}> {}

export const describeByTitleErrors = Effect.catchTags({
	MissingTitleError: ({ message }) => Effect.succeed(message),
	NeonQueryError: ({ message }) => Effect.succeed(message),
	ParseError: ({ message }) => Effect.succeed(message),
});
