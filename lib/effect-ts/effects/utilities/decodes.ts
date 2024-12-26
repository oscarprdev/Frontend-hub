import { ResourceDb } from '../../schemas';
import { Effect, Schema } from 'effect';

export const decodeResourcesDbEffect = Effect.gen(function* () {
	return (input: unknown) => Schema.decodeUnknown(Schema.Array(ResourceDb))(input);
});
