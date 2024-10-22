import { Prisma } from '@prisma/client';
import { ZodError } from 'zod';
import { EmailSubscriptionFormState } from '../action';

export const fromErrorToFormState = (
  error: unknown
): EmailSubscriptionFormState => {
  if (error instanceof ZodError) {
    return {
      status: 'error',
      message: 'Invalid form data',
      errors: error.flatten().formErrors,
      trigger: true,
    };
  } else {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          status: 'error',
          message:
            'This email is already registered in our database!',
          errors: ['Email is already in use'],
          trigger: true,
        };
      }
    }
    return {
      status: 'error',
      message:
        error instanceof Error
          ? error.message
          : 'Something went wrong!',
      errors: [],
      trigger: true,
    };
  }
};

export const toFormState = (
  status: EmailSubscriptionFormState['status'],
  message: string
): EmailSubscriptionFormState => {
  return {
    status,
    message,
    errors: [],
    trigger: true,
  };
};
