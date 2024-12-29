'use client';

import { Button } from './ui/button';
import { Heart } from 'lucide-react';
import React from 'react';
import useFavsStore from '~/lib/store/store';

const FavsBtn = ({ id }: { id: string }) => {
  const { favs, setFav } = useFavsStore();

  const onFavClick = () => {
    setFav(id);
  };

  return <CommonFavsBtn id={id} favs={favs} onFavClick={onFavClick} />;
};

const OptimisticFavsBtn = ({
  id,
  onFavClick,
}: {
  id: string;
  onFavClick: (id: string) => void;
}) => {
  const { favs } = useFavsStore();

  return <CommonFavsBtn id={id} favs={favs} onFavClick={onFavClick} />;
};

const CommonFavsBtn = ({
  id,
  favs,
  onFavClick,
}: {
  id: string;
  favs: string[];
  onFavClick: (id: string) => void;
}) => {
  return (
    <Button
      onClick={() => onFavClick(id)}
      className="group size-8 rounded-full bg-border-foreground text-muted duration-300"
      size={'icon'}
      variant={'destructive'}>
      {favs.includes(id) ? (
        <Heart fill="hsl(0 84.2% 60.2%)" stroke="hsl(0 84.2% 60.2%)" />
      ) : (
        <Heart />
      )}
    </Button>
  );
};

export { FavsBtn, OptimisticFavsBtn };
