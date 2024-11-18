import { Status } from '@/types/common.types';

type BaseFormState = {
  status: Status;
  message: string;
};

type SignupErrors = {
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
  tokenGRecaptcha?: string[];
};

type SigninErrors = {
  email?: string[];
  password?: string[];
};

export type SignupFormState = BaseFormState & {
  errors?: SignupErrors | null;
};

export type SigninFormState = BaseFormState & {
  errors?: SigninErrors | null;
};
