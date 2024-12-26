import { describeResourceByTitleInfraEffect } from '../effects/infra';
import { describeResourceByTitleUsecaseEffect } from '../effects/usecases';
import { validateInputEffect } from '../effects/utilities/validate-inputs';
import { DatabaseService } from './database.service';
import { HandleResourcesDb } from './utils.services';
import { Context, Effect, Layer } from 'effect';

export class ValidateInput extends Context.Tag('ValidateInput')<
	ValidateInput,
	Effect.Effect.Success<typeof validateInputEffect>
>() {
	static readonly Default = Layer.effect(this, validateInputEffect);
}

export class DescribeResourceByTitleInfra extends Effect.Service<DescribeResourceByTitleInfra>()(
	'DescribeResourceByTitleInfra',
	{
		effect: describeResourceByTitleInfraEffect,
		dependencies: [DatabaseService.Default, ValidateInput.Default],
	}
) {}

export class DescribeResourceByTitleUsecase extends Effect.Service<DescribeResourceByTitleUsecase>()(
	'DescribeResourceByTitleUsecase',
	{
		effect: describeResourceByTitleUsecaseEffect,
		dependencies: [DescribeResourceByTitleInfra.Default, HandleResourcesDb.Default],
	}
) {}
