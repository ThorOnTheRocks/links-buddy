import { Status } from '@/types/common.types';
import {
  SignupFormState,
  SigninFormState,
} from '@/features/Auth/actions/auth.types';

export const INITIAL_SIGNUP_STATE: SignupFormState = {
  status: Status.IDLE,
  message: '',
  errors: null,
};

export const INITIAL_SIGNIN_STATE: SigninFormState = {
  status: Status.IDLE,
  message: '',
  errors: null,
};
