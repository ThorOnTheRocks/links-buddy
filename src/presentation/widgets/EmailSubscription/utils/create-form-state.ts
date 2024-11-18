import type { EmailSubscriptionFormState } from '../actions/services/email-subscription/email-subscription.types';
import { Status } from '@/types/common.types';

export function createFormState(
  status: Status.SUCCESS | Status.ERROR,
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
