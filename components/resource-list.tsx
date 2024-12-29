import ErrorToast from './error-toast';
import { FavsBtn } from './favs-btn';
import LoadMore from './load-more';
import ResourceCard from './resource-card';
import ResourceListFavs from './resource-list-favs';
import { Button } from './ui/button';
import { Loader } from 'lucide-react';
import React, { Suspense } from 'react';
import { auth } from '~/auth';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';
import { listResources } from '~/lib/services/queries/listResources';
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
  const result = await listResources({
    category: RESOURCE_CATEGORY[category] || undefined,
    items,
  });
  if (isError(result)) return <ErrorToast error={result.error} />;

  return (
    <div className="flex w-full flex-col gap-5">
      <h2 className="ml-2 text-2xl font-bold md:text-4xl">All resources</h2>
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

const ResourceListFallback = ({ title }: { title?: string }) => (
  <div className="flex w-full flex-col gap-5">
    <h2 className="ml-2 text-4xl font-bold">{title || 'All resources'}</h2>
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
