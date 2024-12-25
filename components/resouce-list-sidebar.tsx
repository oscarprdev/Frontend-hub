import Link from 'next/link';
import React from 'react';
import { listResourcesByCategory } from '~/lib/services/queries/listResources';
import { RESOURCE_CATEGORY } from '~/lib/types/resources';

const ResourceListSidebar = async ({ category }: { category: RESOURCE_CATEGORY }) => {
	const resources = await listResourcesByCategory({ category });

	return (
		<div className="-my-2 flex flex-col items-start">
			{resources.map(resource => (
				<Link
					key={resource.id}
					href={resource.url}
					className="rounded-full p-2 duration-300 hover:bg-accent-foreground">
					{resource.title}
				</Link>
			))}
		</div>
	);
};

const ResourceListSidebarFallback = () => (
	<div className="flex flex-col items-start gap-2">
		{Array.from({ length: 3 }).map((_, i) => (
			<span key={i} className="h-4 w-1/2 animate-pulse rounded-full bg-muted-light"></span>
		))}
	</div>
);

export { ResourceListSidebar, ResourceListSidebarFallback };
