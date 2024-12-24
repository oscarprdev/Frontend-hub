import { submitResourceAction } from '../app/actions/submitResource';
import { ActionResponse } from '../lib/types/action-response';
import { RESOURCE_CATEGORY, Resource } from '../lib/types/resources';
import React from 'react';

const DEFAULT_STATE = {
	id: '',
	title: '',
	description: '',
	url: '',
	imageUrl: '',
	category: RESOURCE_CATEGORY.FRONTEND,
} satisfies Resource;

const DEFAULT_ACTION_RESPONSE = {
	success: false,
	errors: null,
	state: DEFAULT_STATE,
	message: '',
} satisfies ActionResponse<Resource>;

type ResourceFormProps = {
	optimiticAction: (resource: Resource) => void;
	submitAction: (
		_: ActionResponse<Resource>,
		resource: Resource
	) => Promise<ActionResponse<Resource>>;
};

const ResourceForm = ({ optimiticAction }: ResourceFormProps) => {
	const [state, action, isPending] = React.useActionState(
		submitResourceAction,
		DEFAULT_ACTION_RESPONSE
	);

	const handleSubmitAction = async (formData: FormData) => {
		const id = crypto.randomUUID();
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const url = formData.get('url') as string;
		const imageUrl = formData.get('imageUrl') as string;
		const category = formData.get('category') as RESOURCE_CATEGORY;

		const resource = {
			id,
			title,
			description,
			url,
			imageUrl,
			category,
		} satisfies Resource;

		optimiticAction(resource);
		action(resource);
	};

	return (
		<form action={handleSubmitAction} className="flex w-1/2 flex-col items-center gap-2 border p-2">
			<label className="w-full">
				<input
					className="w-full border p-2"
					type="text"
					name="title"
					placeholder="Title"
					required
				/>
			</label>
			<label className="w-full">
				<textarea
					className="w-full border p-2"
					name="description"
					placeholder="Description"
					required
				/>
			</label>
			<label className="w-full">
				<input className="w-full border p-2" type="text" name="url" placeholder="URL" required />
			</label>
			<label className="w-full">
				<input
					className="w-full border p-2"
					type="text"
					name="imageUrl"
					placeholder="Image URL"
					required
				/>
			</label>
			<label className="w-full">
				<input
					className="w-full border border-border p-2"
					type="text"
					name="favicon"
					placeholder="Favicon URL"
				/>
			</label>
			<label>
				Category:
				<select name="category" required>
					<option value={RESOURCE_CATEGORY.FRONTEND}>Frontend</option>
					<option value={RESOURCE_CATEGORY.BACKEND}>Backend</option>
				</select>
			</label>
			<button className="px-5 py-2" type="submit" disabled={isPending}>
				{isPending ? 'Submitting...' : 'Submit'}
			</button>
			{state.success && <p className="text-green-500">{state.message}</p>}
			{state.errors && <p className="text-red-500">{state.message}</p>}
		</form>
	);
};

export default ResourceForm;
