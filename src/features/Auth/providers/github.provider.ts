import { GitHub } from 'arctic';

type GitHubConfig = {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
};

const getBaseUrl = (): string => {
  const environment = process.env.NODE_ENV || 'development';
  if (environment === 'production') {
    return (
      process.env.NEXT_PUBLIC_APP_URL || 'https://www.linksbuddy.org'
    );
  }
  return 'http://localhost:3000';
};

const getGitHubConfig = (): GitHubConfig => {
  if (
    !process.env.GITHUB_CLIENT_ID ||
    !process.env.GITHUB_CLIENT_SECRET
  ) {
    throw new Error(
      'Missing GitHub OAuth credentials. Please ensure GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are set in your environment variables.'
    );
  }

  const baseUrl = getBaseUrl();

  return {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackUrl: `${baseUrl}/api/login/github/callback`,
  };
};

export const github = (() => {
  try {
    const config = getGitHubConfig();
    return new GitHub(
      config.clientId,
      config.clientSecret,
      config.callbackUrl
    );
  } catch (error) {
    console.error('Failed to initialize GitHub OAuth:', error);
    throw error;
  }
})();

export const getConfig = getGitHubConfig;
