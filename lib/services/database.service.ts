import { NeonQueryFunction, neon } from '@neondatabase/serverless';
import { Config, Context, Effect, Layer, Redacted } from 'effect';

export class DatabaseService extends Context.Tag('DatabaseService')<
	DatabaseService,
	NeonQueryFunction<false, false>
>() {
	static readonly Default = Layer.effect(
		this,
		Effect.gen(function* () {
			const dbUrl = yield* Config.redacted('DATABASE_URL');
			return neon(Redacted.value(dbUrl));
		})
	);
}
