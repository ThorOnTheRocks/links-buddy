import { z } from 'zod';

export const EmailSubscriptionSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});
