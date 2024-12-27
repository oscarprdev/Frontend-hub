import { Data } from 'effect';

export class NeonQueryError extends Data.TaggedError('NeonQueryError')<{
    message: string;
}> {}

export class DescribeBySearchInputError extends Data.TaggedError('DescribeBySearchInputError')<{
    message: string;
}> {}
