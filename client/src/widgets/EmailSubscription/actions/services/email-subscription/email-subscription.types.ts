import type { Status } from '@/types/common.types';

export type EmailSubscriptionFormState = {
  status: Status;
  message: string;
  errors?: {
    email?: string[];
    tokenGRecaptcha?: string[];
  } | null;
  trigger: number;
};

export const initialFormState: EmailSubscriptionFormState = {
  status: 'idle',
  message: '',
  errors: {},
  trigger: 0,
};
