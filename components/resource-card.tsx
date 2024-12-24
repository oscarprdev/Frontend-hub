import { Badge } from './ui/badge';
import { MoveUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RESOURCE_CATEGORY } from '~/lib/types/resources';

type ResourceCardProps = {
	id: string;
	title: string;
	description: string;
	imageUrl: string;
	url: string;
	category: RESOURCE_CATEGORY;
	updatedAt?: string;
};

const ResourceCard = ({
	id,
	title,
	description,
	imageUrl,
	url,
	category,
	updatedAt,
}: ResourceCardProps) => {
	return (
		<article id={`resource-card-${id}`} className="flex flex-col gap-2 p-2">
			<picture className="group relative inset-0 h-[25vh] max-h-[250px] overflow-hidden rounded-2xl shadow duration-500 ease-in-out hover:-translate-y-3">
				<Image
					src={imageUrl}
					alt={title}
					width={500}
					height={500}
					className="size-full rounded-2xl object-cover"
				/>
				<Link
					href={url}
					className="group/link absolute bottom-1 right-2 flex items-center justify-between gap-2 rounded-full bg-gradient-to-t from-accent to-accent-light px-3.5 py-1.5 text-sm text-white opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-2 group-hover:opacity-100">
					View
					<MoveUpRight
						size={16}
						className="duration-200 group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
					/>
				</Link>
			</picture>

			<p className="text-xs text-muted">{updatedAt}</p>
			<Link href={`/?category=${category}`} className="group w-fit shadow-sm">
				<Badge className="w-fit duration-300 group-hover:bg-muted-light">{category}</Badge>
			</Link>

			<Link href={url} target="_blank" className="w-fit text-xl font-bold hover:underline">
				{title}
			</Link>
			<p className="line-clamp-3 max-w-[80ch] text-pretty text-sm text-muted">{description}</p>
		</article>
	);
};

export default ResourceCard;
