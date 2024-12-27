import { DescribeBySearchInputError, NeonQueryError } from '../errors';
import { DescribeResourceBySearchInput, FormatDate, ResourceDb } from '../schemas';
import { DatabaseService } from './database.service';
import { Context, Effect, Either, Layer, Schema } from 'effect';

const validateSearchInputEffect = Effect.gen(function* () {
    return (input: typeof DescribeResourceBySearchInput.Encoded) => {
        const response = Schema.validateEither(DescribeResourceBySearchInput)(input);
        if (Either.isLeft(response)) {
            return Either.left(new DescribeBySearchInputError({ message: 'Title is required' }));
        }

        return Either.right(response.right);
    };
});

const decodeResourcesDbEffect = Effect.gen(function* () {
    return (input: unknown) => Schema.decodeUnknown(Schema.Array(ResourceDb))(input);
});

const formatResourceEffect = Effect.gen(function* () {
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

export class ValidateSearchInput extends Context.Tag('ValidateSearchInput')<
    ValidateSearchInput,
    Effect.Effect.Success<typeof validateSearchInputEffect>
>() {
    static readonly Default = Layer.effect(this, validateSearchInputEffect);
}

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

export class DescribeResourceInfra extends Effect.Service<DescribeResourceInfra>()(
    'DescribeResourceInfra',
    {
        effect: Effect.gen(function* () {
            const dbService = yield* DatabaseService;

            return {
                bySearch: (input: typeof DescribeResourceBySearchInput.Encoded) =>
                    Effect.gen(function* () {
                        return yield* Effect.tryPromise({
                            try: () =>
                                dbService(
                                    `SELECT * FROM resources WHERE LOWER(title) LIKE '%' || ($1) || '%';`,
                                    [input.title.toLowerCase()]
                                ),
                            catch: () =>
                                new NeonQueryError({
                                    message: 'Error selecting resources from database',
                                }),
                        });
                    }),
            };
        }),
        dependencies: [DatabaseService.Default],
    }
) {}

export class DescribeResourceService extends Effect.Service<DescribeResourceService>()(
    'DescribeResourceService',
    {
        effect: Effect.gen(function* () {
            const infra = yield* DescribeResourceInfra;
            const decodeResourcesDb = yield* DecodeResourcesDb;
            const formatResource = yield* FormatResource;
            const validateInput = yield* ValidateSearchInput;

            return {
                bySearch: (input: typeof DescribeResourceBySearchInput.Encoded) =>
                    Effect.gen(function* () {
                        const validInput = yield* validateInput(input);
                        const response = yield* infra.bySearch(validInput);
                        const decodedResponse = yield* decodeResourcesDb(response);

                        return decodedResponse.map(formatResource);
                    }),
            };
        }),
        dependencies: [
            DescribeResourceInfra.Default,
            DecodeResourcesDb.Default,
            FormatResource.Default,
            ValidateSearchInput.Default,
        ],
    }
) {}
