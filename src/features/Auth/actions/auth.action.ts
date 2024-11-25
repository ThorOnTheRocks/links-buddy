'use server';

import prisma from '@/infrastructure/db';
import { signupSchema, signInSchema } from '@/schema/auth.schema';
import {
  SignupFormState,
  SigninFormState,
  OAuthProvider,
} from './auth.types';
import {
  hashPassword,
  generateRandomSessionToken,
  createSession,
  setSessionCookie,
  verifyPasswordHash,
  invalidateSession,
} from '../lib';
import { Status } from '@/types/common.types';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { deleteSessionCookie, getAuth } from '../lib/cookie';
import { CaptchaError, verifyCaptchaToken } from '@/utils';
import { Prisma, User } from '@prisma/client';

export const signup = async (
  _formState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> => {
  try {
    const formDataRaw = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    };

    const validatedData = signupSchema.safeParse(formDataRaw);

    if (!validatedData.success) {
      return {
        status: Status.ERROR,
        message: 'Validation failed',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const captchaToken = formData.get('captchaToken');
    if (!captchaToken) {
      return {
        status: Status.ERROR,
        message: 'Verification is required',
        errors: null,
      };
    }

    try {
      const captchaData = await verifyCaptchaToken(
        captchaToken as string
      );
      if (!captchaData.success || captchaData.score < 0.5) {
        return {
          status: Status.ERROR,
          message: 'Verification failed',
          errors: null,
        };
      }
    } catch (error) {
      return {
        status: Status.ERROR,
        message:
          error instanceof CaptchaError
            ? error.message
            : 'Verification error',
        errors: null,
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: validatedData.data.email,
      },
    });

    if (existingUser) {
      return {
        status: Status.ERROR,
        message: 'Email already registered',
        errors: null,
      };
    }

    const passwordHash = await hashPassword(
      validatedData.data?.password!
    );

    const user = await prisma.user.create({
      data: {
        email: validatedData.data.email,
        passwordHash,
      },
    });

    const sessionToken = await generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        status: Status.ERROR,
        message: 'Validation failed',
        errors: error.flatten().fieldErrors,
      };
    }

    console.error('Signup error:', error);

    return {
      status: Status.ERROR,
      message: 'Something went wrong. Please try again.',
      errors: null,
    };
  }
  redirect('/dashboard');
};

export const signin = async (
  _formState: SigninFormState,
  formData: FormData
): Promise<SigninFormState> => {
  try {
    const formDataRaw = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedData = signInSchema.safeParse(formDataRaw);

    if (!validatedData.success) {
      return {
        status: Status.ERROR,
        message: 'Invalid form data',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: validatedData.data?.email,
      },
    });

    if (!user) {
      return {
        status: Status.ERROR,
        message: 'Invalid credentials',
      };
    }

    const validPassword = await verifyPasswordHash(
      user.passwordHash ?? '',
      validatedData.data?.password!
    );

    if (!validPassword) {
      return {
        status: Status.ERROR,
        message: 'Invalid credentials',
      };
    }

    const sessionToken = generateRandomSessionToken();
    const session = await createSession(sessionToken, user.id);

    await setSessionCookie(sessionToken, session.expiresAt);
  } catch (error) {
    console.error('Signin error:', error);

    return {
      status: Status.ERROR,
      message: 'An unexpected error occurred. Please try again.',
    };
  }
  redirect('/dashboard');
};

export const signOut = async () => {
  const { session } = await getAuth();

  if (!session) {
    redirect('/signin');
  }

  await invalidateSession(session.id);
  await deleteSessionCookie();

  redirect('/signin');
};

type CreateUserData = Omit<
  Prisma.UserCreateInput,
  OAuthProvider | 'id' | 'createdAt' | 'updatedAt'
>;

export async function createUser(
  providerId: OAuthProvider,
  providerValue: string,
  userData: CreateUserData
): Promise<User> {
  try {
    const user = await prisma.user.create({
      data: {
        [providerId]: providerValue,
        ...userData,
      },
    });

    return user;
  } catch (error) {
    throw new Error('Failed to create user: ' + error);
  }
}

export async function getUserFromProviderId(
  providerId: OAuthProvider,
  providerValue: string
): Promise<User | null> {
  try {
    const whereInputs = {
      googleId: { googleId: providerValue },
      githubId: { githubId: providerValue },
    } as const;

    const user = await prisma.user.findUnique({
      where: whereInputs[providerId] as Prisma.UserWhereUniqueInput,
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    throw new Error('Failed to fetch user: ' + error);
  }
}
