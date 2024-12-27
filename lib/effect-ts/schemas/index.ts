import { Schema } from 'effect';

export enum RESOURCE_CATEGORY {
	FRONTEND = 'FRONTEND',
	BACKEND = 'BACKEND',
}

export class Resource extends Schema.Class<Resource>('Resource')({
	id: Schema.UUID,
	title: Schema.String,
	description: Schema.String,
	category: Schema.Enums(RESOURCE_CATEGORY),
	url: Schema.String,
	imageUrl: Schema.TemplateLiteral(
		'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/',
		Schema.String
	),
	updatedAt: Schema.String,
}) {}

export class ResourceDb extends Schema.Class<ResourceDb>('ResourceDb')({
	id: Schema.UUID,
	title: Schema.String,
	description: Schema.String,
	url: Schema.String,
	category: Schema.Enums(RESOURCE_CATEGORY),
	imageurl: Schema.TemplateLiteral(
		'https://pub-dd6ab2097287461d82afdef8be7ad9a4.r2.dev/',
		Schema.String
	),
	updatedat: Schema.ValidDateFromSelf,
	createdat: Schema.ValidDateFromSelf,
}) {}

export const FormatDate = Schema.transform(Schema.ValidDateFromSelf, Schema.String, {
	decode: from =>
		from.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}),
	encode: to => new Date(to),
});

export const DescribeResourceBySearchInput = Schema.Struct({
	title: Schema.String,
});
