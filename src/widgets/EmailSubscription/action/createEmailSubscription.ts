'use server';

import prisma from '@/db';
import { EmailSubscriptionSchema } from '../../../schema/EmailSubscriptionSchema';
import {
  fromErrorToFormState,
  toFormState,
} from '../utils/toFormState';

import type { EmailSubscriptionFormState } from './EmailSubscription.types';
import { ZodError } from 'zod';
import { sendEmail } from '@/actions/sendEmail';

export async function createEmailSubscription(
  formState: EmailSubscriptionFormState,
  data: FormData
): Promise<EmailSubscriptionFormState> {
  const formData = Object.fromEntries(data);
  const parsedData = EmailSubscriptionSchema.safeParse(formData);

  if (!parsedData.success) {
    return fromErrorToFormState(
      new ZodError(parsedData.error.errors)
    );
  }

  try {
    const response = await prisma.emailSubscription.create({
      data: {
        first_name: parsedData.data.firstName,
        email: parsedData.data.email,
      },
    });
    await sendEmail(response.email, response.first_name);
    return toFormState(
      'success',
      'Congrats! You have successfully subscribed'
    );
  } catch (error) {
    return fromErrorToFormState(error);
  }
}
