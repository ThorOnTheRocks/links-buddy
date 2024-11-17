import { Status } from '@/types/common.types';

export type SignupFormState = {
  status: Status;
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    tokenGRecaptcha?: string[];
  } | null;
};
