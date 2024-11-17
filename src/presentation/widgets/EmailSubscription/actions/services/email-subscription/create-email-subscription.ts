'use server';

import {
  CaptchaError,
  verifyCaptchaToken,
  createFormState,
  validateEmail,
  createSubscription,
} from '../../../utils';
import { sendEmail } from '../send-email';
import type { EmailSubscriptionFormState } from '../email-subscription/email-subscription.types';

export async function createEmailSubscription(
  _: EmailSubscriptionFormState,
  formData: FormData
): Promise<EmailSubscriptionFormState> {
  try {
    const { email } = await validateEmail(formData);

    try {
      const token = formData.get('tokenGRecaptcha');
      if (!token) {
        throw new CaptchaError('Verification is required');
      }

      const captchaData = await verifyCaptchaToken(token as string);
      if (!captchaData.success || captchaData.score < 0.5) {
        throw new CaptchaError('Verification failed');
      }
    } catch (error) {
      return createFormState(
        'error',
        error instanceof CaptchaError
          ? error.message
          : 'Verification error'
      );
    }

    await createSubscription(email);
    await sendEmail(email);

    return createFormState(
      'success',
      'Successfully subscribed! Check your email for confirmation.'
    );
  } catch (error) {
    return createFormState(
      'error',
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred'
    );
  }
}
