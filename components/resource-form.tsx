'use client';

import { RESOURCE_CATEGORY } from '../lib/types/resources';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
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
		<Form action={formAction} className="flex flex-col gap-3">
			<label className="mt-2 w-full">
				<p className="mb-1 text-sm">Title</p>
				<Input
					className="w-full border p-2"
					type="text"
					name="title"
					placeholder="Enter resource title"
					required
				/>
			</label>
			<label className="w-full">
				<p className="mb-1 text-sm">Description</p>
				<Textarea
					className="w-full border p-2"
					name="description"
					placeholder="Enter resource description"
					required
				/>
			</label>
			<label className="w-full">
				<p className="mb-1 text-sm">URL</p>
				<Input
					className="w-full border p-2"
					type="text"
					name="url"
					placeholder="Enter resource URL"
					required
				/>
			</label>
			<label className="w-full">
				<p className="mb-1 text-sm">Image URL</p>
				<Input
					className="w-full border p-2"
					type="text"
					name="imageUrl"
					placeholder="Enter resource image URL"
					required
				/>
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
