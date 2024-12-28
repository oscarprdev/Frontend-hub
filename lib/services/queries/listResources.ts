import { DATABASE_URL, ITEMS_PER_PAGE } from '../../constants';
import { DbResultError, InputError, handleError } from '../errors';
import { mapResourceDbToApplication } from '../mappers/resource';
import { neon } from '@neondatabase/serverless';
import * as v from 'valibot';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';
import { Resource } from '~/lib/schemas/resource';
import { ResourceDb } from '~/lib/schemas/resource-db';
import { Either, successResponse } from '~/lib/utils/either';

const ListResourcesInputSchema = v.object({
	items: v.optional(v.number()),
	category: v.optional(v.enum(RESOURCE_CATEGORY)),
});

export async function listResources(
	input: v.InferOutput<typeof ListResourcesInputSchema>
): Promise<Either<string, Resource[]>> {
	try {
		const { category, items } = validateListResourcesInput(input);
		const itemsPerPage = items ?? ITEMS_PER_PAGE;

		const sql = neon(DATABASE_URL);
		let result = [];
		if (!category) {
			result = await sql(`SELECT * FROM resources ORDER BY updatedat DESC LIMIT ($1) OFFSET 0 ;`, [
				itemsPerPage,
			]);
		} else {
			result = await sql(
				`SELECT * FROM resources WHERE category = ($1) ORDER BY updatedat DESC LIMIT ($2) OFFSET 0 ;`,
				[category, itemsPerPage]
			);
		}

		const validResult = validateResourcesDbResult(result);

		return successResponse(handleResourcesDb(validResult));
	} catch (error) {
		return handleError(error, 'List Resources');
	}
}

const ListResourcesByCategoryInputSchema = v.object({
	category: v.optional(v.enum(RESOURCE_CATEGORY)),
});

const ListResourcesByCategoryOutputSchema = v.array(
	v.object({
		id: v.string(),
		title: v.string(),
		url: v.string(),
	})
);

export async function listResourcesByCategory(
	input: v.InferOutput<typeof ListResourcesByCategoryInputSchema>
): Promise<Either<string, v.InferOutput<typeof ListResourcesByCategoryOutputSchema>>> {
	try {
		const { category } = validateListResourcesByCategoryInput(input);

		const sql = neon(DATABASE_URL);
		const result = await sql(
			`SELECT id, title, url FROM resources WHERE category = ($1) ORDER BY updatedat DESC;`,
			[category]
		);

		const validResult = validateListResourcesByCategoryOuput(result);

		return successResponse(validResult);
	} catch (error) {
		return handleError(error, 'List Resources By Category Error');
	}
}

export async function countResources() {
	try {
		const sql = neon(DATABASE_URL);
		const result = await sql(`SELECT COUNT(*) FROM resources;`);

		return successResponse(validateCountDbResult(result[0].count));
	} catch (error) {
		return handleError(error, 'Count Resources');
	}
}

const handleResourcesDb = (result: ResourceDb[]): Resource[] => {
	return result.length > 0 ? result.map(res => mapResourceDbToApplication(res)) : [];
};

const validateListResourcesInput = (input: v.InferOutput<typeof ListResourcesInputSchema>) => {
	try {
		return v.parse(ListResourcesInputSchema, input);
	} catch (error) {
		throw new InputError(error instanceof Error ? error.message : 'Input not valid');
	}
};

const validateListResourcesByCategoryInput = (
	input: v.InferOutput<typeof ListResourcesByCategoryInputSchema>
) => {
	try {
		return v.parse(ListResourcesByCategoryInputSchema, input);
	} catch (error) {
		throw new InputError(error instanceof Error ? error.message : 'Input not valid');
	}
};

const validateListResourcesByCategoryOuput = (input: unknown) => {
	try {
		return v.parse(ListResourcesByCategoryOutputSchema, input);
	} catch (error) {
		throw new DbResultError(error instanceof Error ? error.message : 'Db result not valid');
	}
};

const validateResourcesDbResult = (input: unknown) => {
	try {
		return v.parse(v.array(ResourceDb), input);
	} catch (error) {
		throw new DbResultError(error instanceof Error ? error.message : 'Db result not valid');
	}
};

const validateCountDbResult = (input: unknown) => {
	try {
		return v.parse(v.number(), Number(input));
	} catch (error) {
		throw new DbResultError(error instanceof Error ? error.message : 'Db result not valid');
	}
};
