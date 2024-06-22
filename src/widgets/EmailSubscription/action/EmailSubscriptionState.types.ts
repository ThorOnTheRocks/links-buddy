import type { Status } from '@/types/common.types';

export type EmailSubscriptionFormState = {
  message: string;
  status: Status;
  fields?: Record<string, string>;
  errors?: string[];
  timestamp: number;
};
