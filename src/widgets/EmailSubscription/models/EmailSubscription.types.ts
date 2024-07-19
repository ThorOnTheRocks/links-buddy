import type { Status } from '@/types/common.types';

export type EmailSubscriptionFormState = {
  message: string;
  status: Status;
  errors?: {};
  timestamp: number;
};
