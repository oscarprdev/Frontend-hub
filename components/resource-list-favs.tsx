'use client';

import ResourceCard from './resource-card';
import { ResourceListFallback } from './resource-list';
import React from 'react';
import { toast } from 'sonner';
import { listResourcesFavsAction } from '~/app/actions/listResourcesFavs';
import { Resource } from '~/lib/schemas/resource';
import useFavsStore from '~/lib/store/store';
import { isError } from '~/lib/utils/either';

const ResourceListFavs = ({ isUserLogged }: { isUserLogged: boolean }) => {
	const [isFetching, setIsFetching] = React.useState(false);
	const [resources, setResources] = React.useState<Resource[]>([]);
	const { favs } = useFavsStore();

	React.useEffect(() => {
		setIsFetching(true);
		listResourcesFavsAction(favs)
			.then(response => {
				if (isError(response)) return toast.error(response.error);

				setResources(response.success);
			})
			.catch(() => toast.error('Unexpected Error fetching favourites resources'))
			.finally(() => setIsFetching(false));
	}, [favs]);

	return (
		<>
			{!isFetching ? (
				<div className="flex w-full flex-col gap-5">
					<h2 className="ml-2 text-2xl font-bold md:text-4xl">Favourites</h2>
					<div className="m-0 box-border grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 sm:gap-1">
						{!isFetching && resources.length > 0 ? (
							resources.map(resource => {
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
										isUserLogged={isUserLogged}
									/>
								);
							})
						) : (
							<p className="text-sm text-muted">Any resource is setted as favourite yet.</p>
						)}
					</div>
				</div>
			) : (
				<ResourceListFallback title="Favourites" />
			)}
		</>
	);
};

export default ResourceListFavs;
