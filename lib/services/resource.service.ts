import { DateToString, Resource, ResourceDb } from '../schemas/resource.schema';
import { DatabaseService } from './database.service';
import { Context, Data, Effect, Layer, Schema } from 'effect';

class MissingTitleError extends Data.TaggedError('MissingTitleError')<{
	message: string;
}> {}

class NeonQueryError extends Data.TaggedError('NeonQueryError')<{
	message: string;
}> {}

export class MapResourceToApp extends Context.Tag('MapResourceToApp')<
	MapResourceToApp,
	{ map: (input: ResourceDb) => Resource }
>() {
	static readonly Default = Layer.effect(
		this,
		Effect.gen(function* () {
			return {
				map: (resourceDb: ResourceDb) => ({
					id: resourceDb.id,
					title: resourceDb.title,
					description: resourceDb.description,
					url: resourceDb.url,
					imageUrl: resourceDb.imageurl,
					category: resourceDb.category,
					updatedAt: Schema.decodeUnknownSync(DateToString)(resourceDb.updatedat),
				}),
			};
		})
	);
}

export class ResourceService extends Effect.Service<ResourceService>()('ResourceService', {
	effect: Effect.gen(function* () {
		const dbService = yield* DatabaseService;
		const mapResourceToApp = yield* MapResourceToApp;

		return {
			describeResourceByTitle: (title: string) =>
				Effect.gen(function* () {
					if (!title) return yield* new MissingTitleError({ message: 'Title is required' });

					const tryPromiseResponse = yield* Effect.tryPromise({
						try: () =>
							dbService(`SELECT * FROM resources WHERE LOWER(title) LIKE '%' || ($1) || '%';`, [
								title.toLowerCase(),
							]),
						catch: (error: unknown) => new NeonQueryError({ message: error as string }),
					});

					const resourcesInfraArray = yield* Schema.decodeUnknown(Schema.Array(ResourceDb))(
						tryPromiseResponse
					);

					return resourcesInfraArray.map(mapResourceToApp.map);
				}),
		};
	}),
	dependencies: [DatabaseService.Default, MapResourceToApp.Default],
}) {}
