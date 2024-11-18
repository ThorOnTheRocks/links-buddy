import { z } from 'zod';

export async function validateEmail(
  formData: FormData,
  schema: z.ZodType
): Promise<{ email: string }> {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.errors
      .map((error) => error.message)
      .join(', ');

    throw new Error(
      errorMessages || 'Please enter a valid email address'
    );
  }

  return validatedFields.data;
}
