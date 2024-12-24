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
					className="rounded-full p-2 hover:bg-accent-foreground">
					{resource.title}
				</Link>
			))}
		</div>
	);
};

const ResourceListSidebarFallback = () => <div>Loading resources</div>;

export { ResourceListSidebar, ResourceListSidebarFallback };
