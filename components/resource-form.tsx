'use client';

import { Button } from './ui/button';
import OInput from './ui/input-animated';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import OTextarea from './ui/textarea-animated';
import { ShieldAlert } from 'lucide-react';
import Form from 'next/form';
import React from 'react';
import { RESOURCE_CATEGORY } from '~/lib/schemas/resource';

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
			<label className="mt-2 w-full">
				<OInput id="title" text="Title" value={defaultValues?.title} />
			</label>
			<label className="w-full">
				<OTextarea id="description" text="Description" value={defaultValues?.description} />
			</label>
			<label className="w-full">
				<OInput id="url" text="Url" value={defaultValues?.url} />
			</label>
			<label className="w-full">
				<OInput id="imageUrl" text="Image URL" value={defaultValues?.imageUrl} />
			</label>

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
