import { Google } from 'arctic';

type GoogleConfig = {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
};

const getBaseUrl = (): string => {
  const environment = process.env.NODE_ENV || 'development';
  if (environment === 'production') {
    return (
      process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com'
    );
  }
  return 'http://localhost:3000';
};

const getGoogleConfig = (): GoogleConfig => {
  if (
    !process.env.GOOGLE_CLIENT_ID ||
    !process.env.GOOGLE_CLIENT_SECRET
  ) {
    throw new Error(
      'Missing Google OAuth credentials. Please ensure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set in your environment variables.'
    );
  }

  const baseUrl = getBaseUrl();

  return {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: `${baseUrl}/api/login/google/callback`,
  };
};

export const google = (() => {
  try {
    const config = getGoogleConfig();
    return new Google(
      config.clientId,
      config.clientSecret,
      config.callbackUrl
    );
  } catch (error) {
    console.error('Failed to initialize Google OAuth:', error);
    throw error;
  }
})();

export const getConfig = getGoogleConfig;
