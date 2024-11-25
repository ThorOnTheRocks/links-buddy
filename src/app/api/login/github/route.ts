import { generateState } from 'arctic';
import { github } from '@/features/Auth/providers/github.provider';
import { cookies } from 'next/headers';

export async function GET(): Promise<Response> {
  const state = generateState();

  const url = github.createAuthorizationURL(state, []);

  const cookieStore = await cookies();
  cookieStore.set('github_oauth_state', state, {
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  return Response.redirect(url, 302);
}
