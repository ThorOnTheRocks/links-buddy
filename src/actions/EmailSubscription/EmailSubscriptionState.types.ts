export type EmailSubscriptionFormState = {
  message: string;
  status?: 'success' | 'error' | 'loading' | 'idle';
  fields?: Record<string, string>;
  errors?: string[];
  resetKey?: string;
};
