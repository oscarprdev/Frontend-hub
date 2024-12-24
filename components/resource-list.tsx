import { RESOURCE_CATEGORY } from '../lib/types/resources';
import ResourceCard from './resource-card';
import React from 'react';
import { listResources } from '~/lib/services/queries/listResources';

const ResourceList = async ({ category }: { category: RESOURCE_CATEGORY }) => {
	const resources = await listResources({ category });

	return (
		<div className="flex w-full flex-col gap-5">
			<h2 className="ml-2 text-4xl font-bold">All resources</h2>
			<div className="m-0 box-border grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 p-0">
				{resources.map(resource => {
					return (
						<ResourceCard
							key={resource.id}
							id={resource.id}
							title={resource.title}
							description={resource.description}
							imageUrl={resource.imageUrl}
							url={resource.url}
							category={resource.category}
							updatedAt={resource.updatedAt}
						/>
					);
				})}
			</div>
		</div>
	);
};

const ResourceListFallback = () => <div>Loading resources</div>;

export { ResourceList, ResourceListFallback };
