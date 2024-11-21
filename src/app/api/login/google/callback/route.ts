import {
  generateRandomSessionToken,
  createSession,
  setSessionCookie,
} from '@/features/Auth/lib';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { getUserFromProviderId } from '@/features/Auth/actions/auth.action';
import { google } from '@/features/Auth/providers/google.provider';
import { cookies } from 'next/headers';
import { decodeIdToken } from 'arctic';

import type { OAuth2Tokens } from 'arctic';
import { createUser } from '@/features/Auth/actions/auth.action';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieStore = await cookies();
  const storedState =
    cookieStore.get('google_oauth_state')?.value ?? null;
  const codeVerifier =
    cookieStore.get('google_code_verifier')?.value ?? null;
  if (
    code === null ||
    state === null ||
    storedState === null ||
    codeVerifier === null
  ) {
    return new Response('Please restart the process.', {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response('Please restart the process.', {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await google.validateAuthorizationCode(
      code,
      codeVerifier
    );
  } catch {
    return new Response('Please restart the process.', {
      status: 400,
    });
  }

  const claims = decodeIdToken(tokens.idToken());
  console.log({ claims });
  const claimsParser = new ObjectParser(claims);

  const googleId = claimsParser.getString('sub');
  // const email = claimsParser.getString('email');
  const name = claimsParser.getString('name');
  const picture = claimsParser.getString('picture');

  const existingUser = await getUserFromProviderId(
    'googleId',
    googleId
  );
  if (existingUser !== null) {
    const sessionToken = generateRandomSessionToken();
    const session = await createSession(
      sessionToken,
      existingUser.id
    );
    setSessionCookie(sessionToken, session.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/',
      },
    });
  }

  const user = await createUser('googleId', googleId, name, picture);
  const sessionToken = generateRandomSessionToken();
  const session = await createSession(sessionToken, user.id);
  setSessionCookie(sessionToken, session.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/dashboard',
    },
  });
}
