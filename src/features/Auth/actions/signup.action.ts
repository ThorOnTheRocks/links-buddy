'use server';

import prisma from '@/db';
import { signupSchema } from '@/schema/signup.schema';
import { SignupFormState } from './signup.types';
import { hashPassword } from '../password';
import {
  generateRandomSessionToken,
  createSession,
} from '../session';
import { setSessionCookie } from '../cookie';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export const signup = async (
  formState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> => {
  try {
    const formDataRaw = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    const validatedData = signupSchema.parse(formDataRaw);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.email,
      },
    });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const passwordHash = await hashPassword(validatedData.password);

    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        passwordHash,
      },
    });

    const sessionToken = await generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: 'error',
        message: 'Validation failed',
        errors: error.flatten().fieldErrors,
      };
    }

    console.error('Signup error:', error);

    return {
      status: 'error',
      message: 'Something went wrong. Please try again.',
      errors: null,
    };
  } finally {
    redirect('/');
  }
};
