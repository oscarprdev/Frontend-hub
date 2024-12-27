import LoadMore from './load-more';
import ResourceCard from './resource-card';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';
import { RESOURCE_CATEGORY } from '~/lib/schemas/resource';
import { listResources } from '~/lib/services/queries/listResources';

const ResourceList = async ({
	category,
	items,
}: {
	category: RESOURCE_CATEGORY;
	items: number;
}) => {
	const resources = await listResources({ category, items });

	return (
		<div className="flex w-full flex-col gap-5">
			<h2 className="ml-2 text-4xl font-bold">All resources</h2>
			<div className="m-0 box-border grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 sm:gap-1">
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
			<Suspense
				fallback={
					<Button size={'icon'} variant={'ghost'} className="w-fit">
						<Loader size={16} className="animate-spin" />
					</Button>
				}>
				<LoadMore category={category} currentResourcesLength={resources.length} />
			</Suspense>
		</div>
	);
};

const ResourceListFallback = () => (
	<div className="flex w-full flex-col gap-5">
		<h2 className="ml-2 text-4xl font-bold">All resources</h2>
		<div className="m-0 box-border grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
			{Array.from({ length: 6 }).map((_, i) => {
				return (
					<article key={i} className="flex animate-pulse flex-col gap-2 p-2">
						<span id="image" className="h-[25vh] w-full rounded-2xl bg-muted-light"></span>
						<span id="date" className="h-4 w-1/2 rounded-xl bg-muted-light"></span>
						<span id="badge" className="h-6 w-1/3 rounded-full bg-muted-light"></span>
						<span id="title" className="h-6 w-1/2 rounded-2xl bg-muted-light"></span>
						<span id="description" className="flex w-full flex-col gap-2 rounded-2xl">
							<span id="text-line" className="h-4 w-full rounded-2xl bg-muted-light"></span>
							<span id="text-line" className="h-4 w-full rounded-2xl bg-muted-light"></span>
							<span id="text-line" className="h-4 w-1/2 rounded-2xl bg-muted-light"></span>
						</span>
					</article>
				);
			})}
		</div>
	</div>
);

export { ResourceList, ResourceListFallback };
