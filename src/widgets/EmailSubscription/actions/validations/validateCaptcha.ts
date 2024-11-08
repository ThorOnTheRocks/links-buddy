import { verifyCaptchaToken } from '../../utils/captcha/captcha.server';

export async function validateCaptcha(formData: FormData) {
  const token = formData.get('tokenGRecaptcha');
  if (!token) {
    throw new Error('Verification is required. Please try again.');
  }

  const captchaData = await verifyCaptchaToken(token as string);
  if (!captchaData?.success || captchaData.score < 0.5) {
    throw new Error('Verification failed. Please try again.');
  }

  return true;
}
