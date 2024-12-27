'use client';

import { Effect } from 'effect';
import { Loader, Search } from 'lucide-react';
import Link from 'next/link';
import React, { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { describeResourceBySearchAction } from '~/app/actions/describe-resource-by-search';
import { Resource } from '~/lib/types/resources';

const ResourceSearch = () => {
    const [resourceSearched, setResourceSearched] = React.useState<Resource[]>([]);
    const [isSearching, setIsSearching] = React.useState(false);
    const [actionError, setActionError] = React.useState<string | null>(null);
    const formRef = React.useRef<HTMLFormElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const resetSearch = React.useCallback((error: string | null) => {
        React.startTransition(() => {
            setIsSearching(false);
            setResourceSearched([]);
            setActionError(error);
        });
    }, []);

    const handleSearchInput = useDebouncedCallback((event: ChangeEvent<HTMLInputElement>) => {
        setIsSearching(true);

        const target = event.target;
        if (!(target instanceof HTMLInputElement) || !target.value) {
            return resetSearch(null);
        }

        const effect = Effect.gen(function* () {
            yield* Effect.tryPromise({
                try: async () => {
                    const response = await describeResourceBySearchAction({ title: target.value });
                    if (typeof response === 'string') {
                        resetSearch(response);
                    } else {
                        React.startTransition(() => {
                            setIsSearching(false);
                            setActionError(null);
                            setResourceSearched(response);
                        });
                    }
                },
                catch: () => {
                    resetSearch('Unexpected error');
                },
            });
        });

        Effect.runPromise(effect);
    }, 600);

    React.useEffect(() => {
        document.addEventListener('click', event => {
            if (formRef.current?.contains(event.target as Node) || !inputRef.current) {
                return;
            }

            inputRef.current.value = '';
            resetSearch(null);
        });
    }, [resetSearch]);

    return (
        <div className="relative col-span-2 py-2">
            {actionError && (
                <p className="absolute -bottom-2 right-0 text-xs font-bold text-destructive">
                    {actionError}
                </p>
            )}
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
                    {isSearching && (
                        <Loader className="absolute right-3 top-1 animate-spin" size={15} />
                    )}
                </label>
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
