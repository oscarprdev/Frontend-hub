'use client';

import { Button } from './ui/button';
import { Delete, Loader } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { deleteResourceAction } from '~/app/actions/deleteResource';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';
import { isError } from '~/lib/utils/either';

const DeleteResourceBtn = ({
  resourceId,
  category,
}: {
  resourceId: string;
  category: RESOURCE_CATEGORY;
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    const response = await deleteResourceAction({ resourceId, category });
    if (isError(response)) return toast.error(response.error);

    toast.success(response.success);

    setIsDeleting(false);
  };
  return (
    <Button
      className="group size-8 rounded-full bg-border-foreground duration-300"
      variant={'destructive'}
      size={'icon'}
      onClick={handleDelete}>
      {isDeleting ? (
        <Loader className="animate-spin" />
      ) : (
        <Delete className="text-muted group-hover:text-destructive" />
      )}
    </Button>
  );
};

export default DeleteResourceBtn;
