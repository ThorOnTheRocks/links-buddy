'use server';

import { emailSubscriptionSchema } from '@/schema/emailSubscriptionSchema';
import prisma from '@/db';

import type { EmailSubscriptionFormState } from './EmailSubscriptionState.types';
import { Prisma } from '@prisma/client';

export async function createEmailSubscription(
  prevState: EmailSubscriptionFormState,
  data: FormData
): Promise<EmailSubscriptionFormState> {
  const formData = Object.fromEntries(data);
  const parsedData = emailSubscriptionSchema.safeParse(formData);

  if (!parsedData.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(fields)) {
      fields[key] = formData[key].toString();
    }
    return {
      status: 'error',
      message: 'Invalid form data',
      fields,
      errors: Object.values(fields).flat(),
      resetKey: '',
    };
  }

  try {
    await prisma?.emailSubscription.create({
      data: {
        email: parsedData.data.email,
      },
    });
    return {
      status: 'success',
      message: 'Congratulations! You have successfully subscribed 🎉',
      resetKey: Date.now().toString(),
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          status: 'error',
          message:
            'This email is already registered in our database!',
          fields: {},
          errors: ['Email is already in use'],
          resetKey: '',
        };
      }
    }
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong!',
      fields: {},
      errors: [],
      resetKey: '',
    };
  }
}
