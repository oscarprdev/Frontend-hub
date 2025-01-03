'use client';

import { Loader, Search } from 'lucide-react';
import Link from 'next/link';
import React, { ChangeEvent, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { describeResourceByTitleAction } from '~/app/actions/describeResourceByTitle';
import { Resource } from '~/lib/schemas/resource';
import { isError } from '~/lib/utils/either';

const ResourceSearch = () => {
  const [resourceSearched, setResourceSearched] = React.useState<Resource[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const formRef = React.useRef<HTMLFormElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateStates = useCallback(
    ({
      resources,
      loading,
      error,
    }: {
      resources?: Resource[];
      loading?: boolean;
      error?: string;
    }) => {
      React.startTransition(() => {
        setError(error ?? null);
        setIsSearching(loading ?? false);
        setResourceSearched(resources ?? []);
      });
    },
    []
  );

  const handleSearchInput = useDebouncedCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);

    const target = event.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (target.value === '') return updateStates({});

    const response = await describeResourceByTitleAction({ title: target.value });
    if (isError(response)) {
      return updateStates({
        error: response.error,
      });
    }

    updateStates({
      resources: response.success,
    });
  }, 600);

  React.useEffect(() => {
    document.addEventListener('click', event => {
      if (formRef.current?.contains(event.target as Node) || !inputRef.current) return;

      inputRef.current.value = '';
      updateStates({});
    });
  }, [updateStates]);

  return (
    <div className="relative col-span-2 py-2">
      <form ref={formRef} className="w-full">
        <label className="relative h-10 w-full">
          <Search className="absolute left-2 top-1" size={15} />
          <input
            ref={inputRef}
            type="text"
            placeholder="SEARCH"
            onChange={handleSearchInput}
            className="w-full rounded-full border border-border bg-background px-7 py-2 text-xs placeholder:text-xs placeholder:text-foreground focus:outline-accent"
          />
          {isSearching && <Loader className="absolute right-3 top-1 animate-spin" size={15} />}
        </label>
        {error && (
          <p className="text-xs font-bold text-destructive" role="alert">
            {error}
          </p>
        )}
      </form>
      {resourceSearched && resourceSearched.length > 0 && (
        <div
          aria-label="scroll"
          className="absolute z-10 col-span-2 mt-2 flex max-h-36 w-full flex-col gap-2 overflow-y-scroll rounded-xl border border-border bg-background p-2">
          {resourceSearched.map(resource => (
            <Link
              key={resource.id}
              href={resource.url}
              target="_blank"
              className="rounded-xl p-2 text-sm text-muted duration-300 hover:bg-accent-foreground hover:text-foreground">
              {resource.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceSearch;
