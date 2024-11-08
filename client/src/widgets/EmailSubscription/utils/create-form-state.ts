import type { EmailSubscriptionFormState } from '../actions/services/email-subscription/email-subscription.types';

export function createFormState(
  status: 'success' | 'error',
  message: string,
  errors?: Record<string, string[]>
): EmailSubscriptionFormState {
  return {
    status,
    message,
    errors,
    trigger: Date.now(),
  };
}
