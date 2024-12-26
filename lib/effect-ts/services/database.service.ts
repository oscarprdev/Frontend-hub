import { dbEffect } from '../effects/db';
import { Context, Effect, Layer } from 'effect';

export class DatabaseService extends Context.Tag('DatabaseService')<
	DatabaseService,
	Effect.Effect.Success<typeof dbEffect>
>() {
	static readonly Default = Layer.effect(this, dbEffect);
}
