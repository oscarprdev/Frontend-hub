import ErrorToast from './error-toast';
import Link from 'next/link';
import React from 'react';
import { ITEMS_PER_PAGE } from '~/lib/constants';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';
import { countResources } from '~/lib/services/queries/listResources';
import { isError } from '~/lib/utils/either';

const LoadMore = async ({
	currentResourcesLength,
	category,
}: {
	currentResourcesLength: number;
	category: RESOURCE_CATEGORY;
}) => {
	const result = await countResources();
	if (isError(result)) return <ErrorToast error={result.error} />;

	return (
		<>
			{result.success > currentResourcesLength && (
				<Link
					className="w-fit rounded-full bg-accent-foreground px-4 py-2 text-xs text-muted duration-300 hover:bg-accent-light hover:text-background"
					href={
						'/' +
						`?items=${currentResourcesLength + ITEMS_PER_PAGE}` +
						(category ? `&category=${category}` : '')
					}>
					More
				</Link>
			)}
		</>
	);
};

export default LoadMore;
