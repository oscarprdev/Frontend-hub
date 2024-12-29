'use server';

import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { signIn } from '~/auth';

export const loginAction = async (_: unknown, formData: FormData) => {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return {
        message: 'Missing credentials',
      };
    }

    await signIn('credentials', {
      email,
      password,
    });

    redirect('/');
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { message: 'User credentials not valid' };
        case 'CallbackRouteError':
          return { message: 'User not found' };
        default:
          return { message: 'Error logging user' };
      }
    }

    if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
      redirect('/');
    }

    return { message: 'Error logging user' };
  }
};
