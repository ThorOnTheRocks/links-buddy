import { cookies } from 'next/headers';
import { SESSION_COOKIE_NAME } from './cookie.constants';
import { validateSession } from './session';
import { cache } from 'react';
import { Session, User } from '@prisma/client';

export const setSessionCookie = async (
  sessionToken: string,
  expiresAt: Date
) => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    attributes: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: expiresAt,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

export const deleteSessionCookie = async () => {
  const cookie = {
    name: SESSION_COOKIE_NAME,
    value: '',
    attributes: {
      httpOnly: true,
      sameSite: 'lax' as const,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    },
  };

  (await cookies()).set(cookie.name, cookie.value, cookie.attributes);
};

export const getAuth = cache(
  async (): Promise<{
    session: Session | null;
    user: User | null;
  }> => {
    const sessionToken =
      (await cookies()).get(SESSION_COOKIE_NAME)?.value ?? null;

    if (!sessionToken) {
      return { session: null, user: null };
    }

    return validateSession(sessionToken);
  }
);
