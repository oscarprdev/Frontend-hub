import { describeByTitleErrors } from '../errors';
import { DatabaseService } from '../services/database.service';
import {
	DescribeResourceByTitleInfra,
	DescribeResourceByTitleUsecase,
	ValidateInput,
} from '../services/describe-resource.service';
import { DecodeResourcesDb, FormatResource, HandleResourcesDb } from '../services/utils.services';
import { Effect, Layer } from 'effect';

const describeByTitleEffect = (title: string) =>
	Effect.gen(function* () {
		const usecase = yield* DescribeResourceByTitleUsecase;
		return yield* usecase.execute(title);
	});

const describeByTitleLayers = Layer.mergeAll(
	DescribeResourceByTitleInfra.Default,
	DescribeResourceByTitleUsecase.Default,
	DatabaseService.Default,
	HandleResourcesDb.Default,
	DecodeResourcesDb.Default,
	FormatResource.Default,
	ValidateInput.Default
);

export const describeByTitle = (title: string) =>
	describeByTitleEffect(title)
		.pipe(Effect.provide(describeByTitleLayers))
		.pipe(describeByTitleErrors);
