import { errorResponse } from '~/lib/utils/either';

export class InputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputError';
  }
}
export class OutputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OutputError';
  }
}

export class DbResultError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DbResultError';
  }
}

export class CredentialsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CredentialsError';
  }
}

export class RedisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RedisError';
  }
}

export const handleError = (error: unknown, action: string) => {
  if (error instanceof InputError) {
    return errorResponse(`Input validation error: ${error.message} at ${action}`);
  } else if (error instanceof OutputError) {
    return errorResponse(`Output validation error: ${error.message} at ${action}`);
  } else if (error instanceof DbResultError) {
    return errorResponse(`Db error: ${error.message} at ${action}`);
  } else if (error instanceof CredentialsError) {
    return errorResponse(`Credentials error: ${error.message}`);
  } else if (error instanceof RedisError) {
    return errorResponse(`RedisError: ${error.message}`);
  } else if (error instanceof Error) {
    return errorResponse(`Error: ${error.message}`);
  } else {
    return errorResponse(`Error at ${action}`);
  }
};
