import { DATABASE_URL } from '../../constants';
import { InputError, handleError } from '../errors';
import { neon } from '@neondatabase/serverless';
import * as v from 'valibot';
import { Either, successResponse } from '~/lib/utils/either';

const InputSchema = v.object({
	resourceId: v.string('resourceId is required'),
});

export async function deleteResource(
	input: v.InferOutput<typeof InputSchema>
): Promise<Either<string, string>> {
	try {
		const { resourceId } = validateInput(input);

		const sql = neon(DATABASE_URL);
		await sql(`DELETE FROM resources WHERE id = ($1);`, [resourceId]);

		return successResponse('Resource deleted successfully');
	} catch (error) {
		return handleError(error, 'Delete resource');
	}
}

const validateInput = (input: v.InferOutput<typeof InputSchema>) => {
	try {
		return v.parse(InputSchema, input);
	} catch (error) {
		throw new InputError(error instanceof Error ? error.message : 'Input not valid');
	}
};
