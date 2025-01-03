'use server';

import ErrorToast from './error-toast';
import { FavsBtn } from './favs-btn';
import LoadMore from './load-more';
import ResourceCard from './resource-card';
import ResourceListFavs from './resource-list-favs';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';
import { auth } from '~/auth';
import { listResourcesCached } from '~/lib/redis/list-resources';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';
import { countResources, listResources } from '~/lib/services/queries/listResources';
import { isError } from '~/lib/utils/either';

const ResourceList = async ({
  category,
  items,
}: {
  category: RESOURCE_CATEGORY;
  items: number;
}) => {
  const session = await auth();

  // Render resource favs on client
  if (category === ('FAVS' as RESOURCE_CATEGORY))
    return <ResourceListFavs isUserLogged={Boolean(session?.user)} />;

  // Render resources on server
  let result = await listResourcesCached({
    category: RESOURCE_CATEGORY[category],
    items,
  });

  if (isError(result)) {
    result = await listResources({ category: RESOURCE_CATEGORY[category], items });
    if (isError(result)) return <ErrorToast error={result.error} />;
  }

  const countResult = await countResources({ category });
  if (isError(countResult)) return <ErrorToast error={countResult.error} />;

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex items-end gap-2">
        <h2 className="ml-2 text-2xl font-bold md:text-4xl">All resources</h2>
        <p className="mb-1 text-xs text-muted">({countResult.success})</p>
      </div>

      <div className="m-0 box-border grid w-full grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5 sm:gap-1">
        {result.success.map(resource => {
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
              isUserLogged={Boolean(session?.user)}>
              <FavsBtn id={resource.id} />
            </ResourceCard>
          );
        })}
      </div>
      <Suspense
        fallback={
          <Button size={'icon'} variant={'ghost'} className="w-fit">
            <Loader size={16} className="animate-spin" />
          </Button>
        }>
        <LoadMore category={category} currentResourcesLength={result.success.length} />
      </Suspense>
    </div>
  );
};

export { ResourceList };
