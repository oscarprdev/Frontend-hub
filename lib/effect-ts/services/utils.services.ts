import { decodeResourcesDbEffect } from '../effects/utilities/decodes';
import { handleResourceDbEffect } from '../effects/utilities/handlers';
import { formatResourceEffect } from '../effects/utilities/mappers';
import { Context, Effect, Layer } from 'effect';

export class FormatResource extends Context.Tag('FormatResource')<
	FormatResource,
	Effect.Effect.Success<typeof formatResourceEffect>
>() {
	static readonly Default = Layer.effect(this, formatResourceEffect);
}

export class DecodeResourcesDb extends Context.Tag('DecodeResourcesDb')<
	DecodeResourcesDb,
	Effect.Effect.Success<typeof decodeResourcesDbEffect>
>() {
	static readonly Default = Layer.effect(this, decodeResourcesDbEffect);
}

export class HandleResourcesDb extends Effect.Service<HandleResourcesDb>()('HandleResourcesDb', {
	effect: handleResourceDbEffect,
	dependencies: [DecodeResourcesDb.Default, FormatResource.Default],
}) {}
