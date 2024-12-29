'use client';

import { Button } from './ui/button';
import { Label } from './ui/label';
import OInput from './ui/o-input';
import OTextarea from './ui/o-textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CircleAlert } from 'lucide-react';
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
        name="title"
        placeholder="Enter resource title"
        defaultValue={defaultValues?.title}
      />
      <OTextarea
        id="description"
        name="description"
        label="Description"
        placeholder="Enter description"
        defaultValue={defaultValues?.description}
      />
      <OInput
        id="url"
        label="Url"
        name="url"
        placeholder="Enter resource URL"
        defaultValue={defaultValues?.url}
      />

      <OInput
        id="imageUrl"
        name="imageUrl"
        label="Image URL"
        placeholder="Enter resource imageURL"
        defaultValue={defaultValues?.imageUrl}
      />

      <div className="space-y-2">
        <Label htmlFor="category">Select category</Label>
        <Select
          name="category"
          defaultValue={Object.values(RESOURCE_CATEGORY).find(
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
        <div className="rounded-lg border border-red-500/50 px-4 py-3 text-red-600">
          <p className="text-sm">
            <CircleAlert
              className="-mt-0.5 me-3 inline-flex opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            {state.message}
          </p>
        </div>
      )}
    </Form>
  );
};

export default ResourceForm;
