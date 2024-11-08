import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import prisma from '@/db';

export async function createSubscription(email: string) {
  try {
    await prisma.emailSubscription.create({
      data: { email },
    });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new Error('This email is already registered');
    }
    throw error;
  }
}
