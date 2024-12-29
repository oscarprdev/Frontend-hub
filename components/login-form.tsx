'use client';

import { Button } from './ui/button';
import OInput from './ui/o-input';
import { CircleAlert } from 'lucide-react';
import React, { useActionState } from 'react';
import { loginAction } from '~/app/actions/login';

type InitialState = { message: string };

const initialState = {
  message: '',
} as InitialState;

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <OInput label="Email" name="email" id="email" placeholder="Enter email" required />
      <OInput
        label="Password"
        name="password"
        id="password"
        type="password"
        placeholder="Enter password"
        required
      />
      <Button className="mt-5 px-5 py-2" type="submit" disabled={isPending}>
        {isPending ? 'Submitting...' : 'Submit'}
      </Button>
      {state?.message && (
        <div className="rounded-lg border border-red-500/50 px-4 py-3 text-red-600">
          <p className="text-xs">
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
    </form>
  );
};

export default LoginForm;
