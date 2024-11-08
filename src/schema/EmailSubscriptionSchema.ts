import { z } from 'zod';

export const EmailSubscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  recaptchaToken: z
    .string({
      required_error: 'Verification required',
      invalid_type_error: 'Verification failed',
    })
    .min(1, 'Verification required'),
});

export type EmailSubscriptionForm = z.infer<
  typeof EmailSubscriptionSchema
>;
