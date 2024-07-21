import type { Status } from '@/types/common.types';

export type EmailSubscriptionFormState = {
  message: string;
  status: Status;
  errors?: {};
  timestamp: number;
};

export const initialFormState: EmailSubscriptionFormState = {
  message: '',
  status: 'idle',
  errors: [],
  timestamp: 0,
};
