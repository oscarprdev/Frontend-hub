import ErrorToast from './error-toast';
import Link from 'next/link';
import React from 'react';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';
import { listResourcesByCategory } from '~/lib/services/queries/listResources';
import { isError } from '~/lib/utils/either';

const ResourceListSidebar = async ({ category }: { category: RESOURCE_CATEGORY }) => {
  const result = await listResourcesByCategory({ category });
  if (isError(result)) return <ErrorToast error={result.error} />;

  return (
    <div className="-my-2 flex flex-col items-start">
      {result.success.map(resource => (
        <Link
          key={resource.id}
          href={resource.url}
          target="_blank"
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
