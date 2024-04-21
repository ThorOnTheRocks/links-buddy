'use server';

import { emailSubscriptionSchema } from '@/schema/emailSubscriptionSchema';
import prisma from '@/db';

import type { EmailSubscriptionFormState } from './EmailSubscriptionState.types';
import { Prisma } from '@prisma/client';

export async function createEmailSubscription(
  prevState: EmailSubscriptionFormState,
  data: FormData
): Promise<EmailSubscriptionFormState> {
  console.log('data: ', data);
  const formData = Object.fromEntries(data);
  console.log('form data: ', formData);
  const parsedData = emailSubscriptionSchema.safeParse(formData);
  console.log('parsed data: ', parsedData);

  if (!parsedData.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(fields)) {
      fields[key] = formData[key].toString();
    }
    return {
      success: false,
      message: 'Invalid form data',
      fields,
      errors: Object.values(fields).flat(),
    };
  }

  try {
    await prisma?.emailSubscription.create({
      data: {
        email: parsedData.data.email,
      },
    });
    return {
      success: true,
      message: 'Congratulations! You have successfully subscribed 🎉',
      resetKey: Date.now().toString(),
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          success: false,
          message:
            'This email is already registered in our database!',
          fields: {},
          errors: ['Email is already in use'],
        };
      }
    }
    console.error('Error while subscribing:', error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong!',
      fields: {},
      errors: [],
    };
  }
}
