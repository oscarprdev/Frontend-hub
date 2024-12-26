import { FormatDate, ResourceDb } from '../../schemas';
import { Effect, Schema } from 'effect';

export const formatResourceEffect = Effect.gen(function* () {
	return (resourceDb: ResourceDb) => ({
		id: resourceDb.id,
		title: resourceDb.title,
		description: resourceDb.description,
		url: resourceDb.url,
		imageUrl: resourceDb.imageurl,
		category: resourceDb.category,
		updatedAt: Schema.decodeUnknownSync(FormatDate)(resourceDb.updatedat),
	});
});
