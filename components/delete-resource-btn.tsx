'use client';

import { Button } from './ui/button';
import { Delete, Loader } from 'lucide-react';
import React from 'react';
import { deleteResourceAction } from '~/app/actions/deleteResource';

const DeleteResourceBtn = ({ resourceId }: { resourceId: string }) => {
	const [isDeleting, setIsDeleting] = React.useState(false);

	const handleDelete = async () => {
		setIsDeleting(true);

		await deleteResourceAction({ resourceId });

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
