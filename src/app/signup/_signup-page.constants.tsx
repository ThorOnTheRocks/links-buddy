import { Status } from '@/types/common.types';
import { SignupFormState } from '@/features/Auth/actions/signup.types';
import { Mail, Lock } from 'lucide-react';

export const INITIAL_STATE: SignupFormState = {
  status: Status.IDLE,
  message: '',
  errors: null,
};

export const FORM_FIELDS = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: <Mail />,
    placeholder: '',
  },
  {
    name: 'password',
    label: 'Create password',
    type: 'password',
    icon: <Lock />,
    placeholder: '',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    icon: <Lock />,
    placeholder: '',
  },
] as const;
