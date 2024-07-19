'use server';

import prisma from '@/db';
import { EmailSubscriptionSchema } from '../../../schema/EmailSubscriptionSchema';
import {
  fromErrorToFormState,
  toFormState,
} from '../utils/toFormState';

import type { EmailSubscriptionFormState } from '../models/EmailSubscription.types';

export async function createEmailSubscription(
  formState: EmailSubscriptionFormState,
  data: FormData
): Promise<EmailSubscriptionFormState> {
  const formData = Object.fromEntries(data);
  const parsedData = EmailSubscriptionSchema.safeParse(formData);

  if (!parsedData.success) {
    const errors: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      errors[key] = formData[key].toString();
    }
    return {
      status: 'error',
      message: 'Invalid form data',
      errors,
      timestamp: Date.now(),
    };
  }

  try {
    await prisma?.emailSubscription.create({
      data: {
        firstName: parsedData.data.firstName,
        email: parsedData.data.email,
      },
    });
    return toFormState(
      'success',
      'Congrats! You have successfully subscribed'
    );
  } catch (error) {
    return fromErrorToFormState(error);
  }
}
