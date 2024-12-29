import { CredentialsError, DbResultError, InputError, handleError } from '../errors';
import { neon } from '@neondatabase/serverless';
import * as v from 'valibot';
import { DATABASE_URL } from '~/lib/constants';
import { successResponse } from '~/lib/utils/either';

const InputSchema = v.object({
  email: v.pipe(v.string('email is required'), v.email('email must be valid format')),
  password: v.string('password is required'),
});

export const login = async (input: v.InferOutput<typeof InputSchema>) => {
  try {
    const { email, password } = validateInput(input);

    const sql = neon(DATABASE_URL);
    const result = await sql('SELECT id, email, password FROM users WHERE email = ($1)', [email]);

    const user = validateDbResult(result[0]);

    if (password !== user.password) throw new CredentialsError('Wrong user credentials');

    return successResponse({ id: user.id });
  } catch (error) {
    return handleError(error, 'Login');
  }
};

const validateInput = (input: unknown) => {
  try {
    return v.parse(InputSchema, input);
  } catch (error) {
    throw new InputError(error instanceof Error ? error.message : 'Input not valid');
  }
};

const validateDbResult = (input: unknown) => {
  try {
    return v.parse(v.object({ id: v.string(), email: v.string(), password: v.string() }), input);
  } catch (error) {
    throw new DbResultError(error instanceof Error ? error.message : 'Db result not valid');
  }
};
