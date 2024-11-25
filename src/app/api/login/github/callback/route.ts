import {
  generateRandomSessionToken,
  createSession,
  setSessionCookie,
} from '@/features/Auth/lib';
import { github } from '@/features/Auth/providers/github.provider';
import { cookies } from 'next/headers';

import type { OAuth2Tokens } from 'arctic';
import {
  getUserFromProviderId,
  createUser,
} from '@/features/Auth/actions/auth.action';

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const cookieStore = await cookies();
  const storedState =
    cookieStore.get('github_oauth_state')?.value ?? null;

  const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
    'Access-Control-Allow-Headers': 'Authorization,Content-Type',
  };

  if (code === null || state === null || storedState === null) {
    return new Response(null, {
      status: 400,
      headers,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
      headers,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await github.validateAuthorizationCode(code);
  } catch (e) {
    return new Response(null, {
      status: 400,
      headers,
    });
  }
  const githubUserResponse = await fetch(
    'https://api.github.com/user',
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    }
  );
  const githubUser = await githubUserResponse.json();
  console.log({ githubUser });
  const githubUserId = githubUser.id;
  const githubUsername = githubUser.login;
  const githubUserPicture = githubUser.avatar_url;
  const githubUserEmail = githubUser.email;

  const existingUser = await getUserFromProviderId(
    'githubId',
    githubUserId
  );

  if (existingUser !== null) {
    const sessionToken = generateRandomSessionToken();
    const session = await createSession(
      sessionToken,
      existingUser.id
    );
    await setSessionCookie(sessionToken, session.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        ...headers,
        Location: '/dashboard',
      },
    });
  }

  const user = await createUser('githubId', githubUserId, {
    username: githubUsername,
    picture: githubUserPicture,
    email: githubUserEmail,
  });

  const sessionToken = generateRandomSessionToken();
  const session = await createSession(sessionToken, user.id);
  await setSessionCookie(sessionToken, session.expiresAt);
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/dashboard',
    },
  });
}
