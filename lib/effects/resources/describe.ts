import { Effect, Layer } from 'effect';
import { MapResourceToApp, ResourceService } from '~/lib/services/resource.service';

const describeByTitleEffect = (title: string) =>
	Effect.gen(function* () {
		const resourceService = yield* ResourceService;
		return yield* resourceService.describeResourceByTitle(title);
	});

export const describeByTitle = (title: string) =>
	describeByTitleEffect(title)
		.pipe(Effect.provide(Layer.mergeAll(ResourceService.Default, MapResourceToApp.Default)))
		.pipe(
			Effect.catchTags({
				MissingTitleError: () => Effect.succeed('Mising title error'),
				NeonQueryError: () => Effect.succeed('Neon query error'),
				ParseError: () => Effect.succeed('Error parsing resource'),
			})
		);
