import { Status } from '@/types/common.types';
import { SigninFormState } from '@/features/Auth/actions/auth.types';
import { Mail, Lock } from 'lucide-react';

export const INITIAL_STATE: SigninFormState = {
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
    label: 'Password',
    type: 'password',
    icon: <Lock />,
    placeholder: '',
  },
] as const;
