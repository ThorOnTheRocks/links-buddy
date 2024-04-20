import { z } from 'zod';

export const emailSubscriptionSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
  })
  .required();
