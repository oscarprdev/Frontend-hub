import { neon } from '@neondatabase/serverless';
import { Config, Context, Effect, Layer, Redacted } from 'effect';

const dbEffect = Effect.gen(function* () {
	const dbUrl = yield* Config.redacted('DATABASE_URL');
	return neon(Redacted.value(dbUrl));
});

export class DatabaseService extends Context.Tag('DatabaseService')<
	DatabaseService,
	Effect.Effect.Success<typeof dbEffect>
>() {
	static readonly Default = Layer.effect(this, dbEffect);
}
