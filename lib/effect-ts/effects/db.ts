import { neon } from '@neondatabase/serverless';
import { Config, Effect, Redacted } from 'effect';

export const dbEffect = Effect.gen(function* () {
	const dbUrl = yield* Config.redacted('DATABASE_URL');
	return neon(Redacted.value(dbUrl));
});
