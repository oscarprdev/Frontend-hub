'use client';

import { Button } from './ui/button';
import { Label } from './ui/label';
import OInput from './ui/o-input';
import OTextarea from './ui/o-textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ShieldAlert } from 'lucide-react';
import Form from 'next/form';
import React from 'react';
import { RESOURCE_CATEGORY } from '~/lib/schemas/category';

type InitialState = { message: string; id?: string };

const initialState = {
	message: '',
	id: undefined,
} as InitialState;

type ResourceFormProps = {
	submitAction: (intialState: InitialState, formData: FormData) => Promise<InitialState>;
	defaultValues?: {
		id: string;
		title: string;
		description: string;
		url: string;
		imageUrl: string;
		category: RESOURCE_CATEGORY;
	};
};

const ResourceForm = ({ submitAction, defaultValues }: ResourceFormProps) => {
	const [state, formAction, isPending] = React.useActionState(submitAction, {
		...initialState,
		id: defaultValues?.id,
	});

	return (
		<Form action={formAction} className="flex flex-col gap-4">
			<OInput
				id="title"
				label="Title"
				placeholder="Enter resource title"
				value={defaultValues?.title}
			/>
			<OTextarea
				id="description"
				label="Description"
				placeholder="Enter description"
				value={defaultValues?.description}
			/>
			<OInput id="url" label="Url" placeholder="Enter resource URL" value={defaultValues?.url} />

			<OInput
				id="imageUrl"
				label="Image URL"
				placeholder="Enter resource imageURL"
				value={defaultValues?.imageUrl}
			/>

			<div className="space-y-2">
				<Label htmlFor="category">Select category</Label>
				<Select
					name="category"
					value={Object.values(RESOURCE_CATEGORY).find(
						category => category === defaultValues?.category
					)}>
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
			</div>

			<Button className="mt-5 px-5 py-2" type="submit" disabled={isPending}>
				{isPending ? 'Submitting...' : 'Submit'}
			</Button>
			{state?.message && (
				<div className="flex w-full items-center gap-1 rounded-md border border-destructive p-2 text-destructive">
					<ShieldAlert size={15} />
					<p aria-live="polite" className="text-xs">
						{state.message}
					</p>
				</div>
			)}
		</Form>
	);
};

export default ResourceForm;
