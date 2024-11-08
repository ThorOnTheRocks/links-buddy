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
import { verifyRecaptchaToken } from './verifyRecaptchaToken';

export async function createEmailSubscription(
  _formState: EmailSubscriptionFormState,
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
    await verifyRecaptchaToken(parsedData.data.recaptchaToken);

    const response = await prisma.emailSubscription.create({
      data: {
        email: parsedData.data.email,
      },
    });
    await sendEmail(response.email);
    return toFormState(
      'success',
      'Congrats! You have successfully subscribed'
    );
  } catch (error) {
    return fromErrorToFormState(error);
  }
}
