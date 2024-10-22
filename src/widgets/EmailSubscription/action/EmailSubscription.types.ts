import type { Status } from '@/types/common.types';

export type EmailSubscriptionFormState = {
  message: string;
  status: Status;
  errors?: {};
  trigger: boolean;
};

export const initialFormState: EmailSubscriptionFormState = {
  message: '',
  status: 'idle',
  errors: [],
  trigger: false,
};
