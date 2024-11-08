'use server';

export async function verifyRecaptchaToken(token: string) {
  const verificationUrl =
    'https://www.google.com/recaptcha/api/siteverify';
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured');
  }

  const response = await fetch(verificationUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  });

  const data = await response.json();

  if (!data.success || data.score < 0.5) {
    throw new Error('ReCAPTCHA verification failed');
  }

  return true;
}
