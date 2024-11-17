import { EmailSubscriptionSchema } from '../../schema/EmailSubscriptionSchema';

export async function validateEmail(formData: FormData) {
  const validatedFields = EmailSubscriptionSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    throw new Error('Please enter a valid email address');
  }

  return validatedFields.data;
}
