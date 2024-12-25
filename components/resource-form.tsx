'use client';

import { RESOURCE_CATEGORY } from '../lib/types/resources';
import { Button } from './ui/button';
import OInput from './ui/input-animated';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import OTextarea from './ui/textarea-animated';
import Form from 'next/form';
import React from 'react';

const initialState = {
	message: '',
};

type ResourceFormProps = {
	submitAction: (_: unknown, formData: FormData) => Promise<{ message: string }>;
};

const ResourceForm = ({ submitAction }: ResourceFormProps) => {
	const [state, formAction, isPending] = React.useActionState(submitAction, initialState);

	return (
		<Form action={formAction} className="flex flex-col gap-4">
			<label className="mt-2 w-full">
				<OInput id="title" text="Title" />
			</label>
			<label className="w-full">
				<OTextarea id="description" text="Description" />
			</label>
			<label className="w-full">
				<OInput id="url" text="Url" />
			</label>
			<label className="w-full">
				<OInput id="imageUrl" text="Image URL" />
			</label>

			<Select name="category">
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Category" />
				</SelectTrigger>
				<SelectContent>
					{Object.values(RESOURCE_CATEGORY).map(category => (
						<SelectItem key={category} value={category}>
							{category}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Button className="mt-5 px-5 py-2" type="submit" disabled={isPending}>
				{isPending ? 'Submitting...' : 'Submit'}
			</Button>
			<p aria-live="polite">{state?.message}</p>
		</Form>
	);
};

export default ResourceForm;
