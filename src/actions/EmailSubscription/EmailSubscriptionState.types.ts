export type EmailSubscriptionFormState = {
  message: string;
  success?: boolean;
  fields?: Record<string, string>;
  errors?: string[];
  resetKey?: string;
};
