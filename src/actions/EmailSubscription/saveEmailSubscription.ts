'use server';

import { emailSubscriptionSchema } from '@/schema/emailSubscriptionSchema';
import prisma from '@/db';

import type { EmailSubscriptionFormState } from './EmailSubscriptionState.types';

export async function saveEmailSubscription(
  prevState: EmailSubscriptionFormState,
  data: FormData
): Promise<EmailSubscriptionFormState> {
  const formData = Object.fromEntries(data.entries());
  const parsedData = emailSubscriptionSchema.safeParse(formData);

  if (!parsedData.success) {
    const field: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      field[key] = field[key].toString();
    }
    return {
      message: 'Invalid form data',
      field,
      issues: parsedData.error.issues.map((issue) => issue.message),
    };
  }

  try {
    await prisma?.emailSubscription.create({
      data: {
        email: parsedData.data.email,
      },
    });
    return {
      message: 'Congratulations! You have successfully subscribed 🎉',
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: 'Something went wrong!',
      };
    }
  }
}
