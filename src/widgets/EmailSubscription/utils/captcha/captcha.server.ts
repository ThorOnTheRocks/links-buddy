import { CaptchaError } from './captcha.client';
import { CaptchaData } from './captcha.types';

export async function verifyCaptchaToken(
  token: string
): Promise<CaptchaData> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new CaptchaError('Missing reCAPTCHA secret key');
  }

  try {
    const url = new URL(
      'https://www.google.com/recaptcha/api/siteverify'
    );
    url.searchParams.append('secret', secretKey);
    url.searchParams.append('response', token);

    const response = await fetch(url.toString(), { method: 'POST' });

    if (!response.ok) {
      throw new CaptchaError('reCAPTCHA verification failed');
    }

    return response.json();
  } catch (error) {
    throw new CaptchaError(
      error instanceof CaptchaError
        ? error.message
        : 'reCAPTCHA verification error'
    );
  }
}
