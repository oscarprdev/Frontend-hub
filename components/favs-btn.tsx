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
	return (
		<Button
			onClick={onFavClick}
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

export default FavsBtn;
