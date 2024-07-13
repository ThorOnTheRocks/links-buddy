import { z } from 'zod';

export const EmailSubscriptionSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: 'First name is required.',
    }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
  })
  .required();
