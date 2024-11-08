export class CaptchaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CaptchaError';
  }
}

export async function getCaptchaToken(): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    throw new CaptchaError('Missing reCAPTCHA site key');
  }

  try {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(async () => {
        try {
          const token = await grecaptcha.execute(siteKey, {
            action: 'emailSubscription',
          });
          resolve(token);
        } catch (error) {
          reject(new CaptchaError('reCAPTCHA execution failed'));
        }
      });
    });
  } catch (error) {
    throw new CaptchaError('reCAPTCHA setup failed');
  }
}
