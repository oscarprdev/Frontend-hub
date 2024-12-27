import { DescribeResourceBySearchInput } from '../schemas';
import { DatabaseService } from '../services/database.service';
import {
    DecodeResourcesDb,
    DescribeResourceInfra,
    DescribeResourceService,
    FormatResource,
    HandleResourcesDb,
    ValidateSearchInput,
} from '../services/describe-resource.service';
import { Effect, Layer } from 'effect';

export const describeResourceBySearch = (input: typeof DescribeResourceBySearchInput.Encoded) =>
    Effect.gen(function* () {
        const service = yield* DescribeResourceService;
        return yield* service.bySearch(input);
    })
        .pipe(
            Effect.provide(
                Layer.mergeAll(
                    DescribeResourceInfra.Default,
                    DescribeResourceService.Default,
                    DatabaseService.Default,
                    HandleResourcesDb.Default,
                    DecodeResourcesDb.Default,
                    FormatResource.Default,
                    ValidateSearchInput.Default
                )
            )
        )
        .pipe(
            Effect.catchTags({
                DescribeBySearchInputError: ({ message }) => Effect.succeed(message),
                NeonQueryError: ({ message }) => Effect.succeed(message),
                ParseError: () => Effect.succeed('Error parsing input'),
            })
        );
