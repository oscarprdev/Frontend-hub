'use client';

import DeleteResourceBtn from './delete-resource-btn';
import ResourceForm from './resource-form';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { MoveUpRight, Pencil } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import { editResourceAction } from '~/app/actions/editResource';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';

type ResourceCardProps = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  category: RESOURCE_CATEGORY;
  updatedAt?: string;
  isUserLogged: boolean;
};

const ResourceCard = ({
  id,
  title,
  description,
  imageUrl,
  url,
  category,
  updatedAt,
  isUserLogged,
  children,
}: PropsWithChildren<ResourceCardProps>) => {
  return (
    <article id={`resource-card-${id}`} className="flex flex-col gap-1 p-2 md:gap-2">
      <picture className="group relative inset-0 h-[25vh] overflow-hidden rounded-2xl border border-muted-light shadow duration-500 ease-in-out hover:-translate-y-3 sm:h-[30vh] md:h-[25vh]">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="size-full rounded-2xl object-cover"
        />
        <Link
          href={url}
          target="_blank"
          className="group/link absolute bottom-1 right-2 flex items-center justify-between gap-2 rounded-full bg-gradient-to-t from-accent to-accent-light px-3.5 py-1.5 text-sm text-white opacity-0 transition-all duration-500 ease-in-out group-hover:-translate-y-2 group-hover:opacity-100">
          View
          <MoveUpRight
            size={16}
            className="duration-200 group-hover/link:-translate-y-1 group-hover/link:translate-x-1"
          />
        </Link>
      </picture>

      <p className="text-xs text-muted">{updatedAt}</p>
      <div className="flex items-center gap-2">
        <Link href={`/?category=${category}`} className="group flex w-fit shadow-sm">
          <Badge className="w-fit duration-300 group-hover:bg-muted-light">{category}</Badge>
        </Link>
        {children}
        {isUserLogged && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant={'outline'}
                  size={'icon'}
                  className="size-8 rounded-full bg-border-foreground text-muted">
                  <Pencil />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Resource</DialogTitle>
                  <ResourceForm
                    submitAction={editResourceAction}
                    defaultValues={{ id, title, description, url, imageUrl, category }}
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <DeleteResourceBtn resourceId={id} category={category} />
          </>
        )}
      </div>

      <Link href={url} target="_blank" className="w-fit text-xl font-bold hover:underline md:-mt-1">
        {title}
      </Link>
      <p className="line-clamp-3 max-w-[80ch] text-pretty text-xs text-muted md:-mt-2">
        {description}
      </p>
    </article>
  );
};

export default ResourceCard;
