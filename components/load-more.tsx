import Link from 'next/link';
import React from 'react';
import { ITEMS_PER_PAGE } from '~/lib/constants';
import { RESOURCE_CATEGORY } from '~/lib/schemas/resource';
import { countResources } from '~/lib/services/queries/listResources';

const LoadMore = async ({
	currentResourcesLength,
	category,
}: {
	currentResourcesLength: number;
	category: RESOURCE_CATEGORY;
}) => {
	const count = await countResources();

	return (
		<>
			{count > currentResourcesLength && (
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
