'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import useFavsStore from '~/lib/store/store';
import { cn } from '~/lib/utils/cn';

const favsCategory = 'FAVS';

const FavsCategory = ({ category }: { category: string }) => {
  const { favs } = useFavsStore();

  const isSelected = React.useMemo(() => favsCategory === category, [category]);

  return (
    <Link
      key={crypto.randomUUID()}
      href={isSelected ? `/` : `/?category=${favsCategory}`}
      className={cn(
        isSelected
          ? 'border-transparent bg-accent text-white hover:bg-accent-dark'
          : 'bg-transparent hover:bg-accent-foreground',
        'relative grid place-items-center rounded-full border p-1.5 duration-300'
      )}>
      <Heart size={18} className="mt-[0.1rem]" />
      {favs.length > 0 && (
        <span className="absolute -right-1 -top-1 grid place-items-center rounded-full bg-accent px-1 py-0 text-xs text-white">
          {favs.length}
        </span>
      )}
    </Link>
  );
};

export default FavsCategory;
