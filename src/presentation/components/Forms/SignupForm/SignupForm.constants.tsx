import { Status } from '@/types/common.types';
import { SignupFormState } from '@/features/Auth/actions/signup.types';

export const INITIAL_STATE: SignupFormState = {
  status: Status.IDLE,
  message: '',
  errors: null,
};
