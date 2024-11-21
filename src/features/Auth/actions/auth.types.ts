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

export type OAuthProvider = 'googleId' | 'githubId';

export interface User {
  id: string;
  email: string;
  name: string;
  googleId: string | null;
  githubId: string | null;
  username: string;
  passwordHash: string | null;
}
