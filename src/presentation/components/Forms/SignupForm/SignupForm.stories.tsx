import type { Meta, StoryObj } from '@storybook/react';
import { SignupForm } from './SignupForm';
import { Mail, Lock } from 'lucide-react';
import { Status } from '@/types/common.types';

const meta = {
  title: 'Forms/SignupForm',
  component: SignupForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof SignupForm>;

const mockFormFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: <Mail />,
    placeholder: 'Enter your email',
  },
  {
    name: 'password',
    label: 'Create password',
    type: 'password',
    icon: <Lock />,
    placeholder: 'Enter your password',
  },
  {
    name: 'confirmPassword',
    label: 'Confirm password',
    type: 'password',
    icon: <Lock />,
    placeholder: 'Confirm your password',
  },
] as const;

const mockUseActionState = (status: Status, isPending: boolean) => {
  return [
    { status, message: '', errors: null },
    () => {},
    isPending,
  ] as const;
};

export const Default: Story = {
  args: {
    formFields: mockFormFields,
  },
  parameters: {
    mockData: [
      {
        url: '/api/auth/signup',
        method: 'POST',
        status: 200,
        response: {},
      },
    ],
  },
};

export const Loading: Story = {
  args: {
    formFields: mockFormFields,
  },
  decorators: [
    (Story) => {
      jest
        .spyOn(require('react'), 'useActionState')
        .mockReturnValue(mockUseActionState(Status.IDLE, true));
      return <Story />;
    },
  ],
};

export const WithValidationErrors: Story = {
  args: {
    formFields: mockFormFields,
  },
  decorators: [
    (Story) => {
      const mockState = {
        status: Status.ERROR,
        message: 'Validation failed',
        errors: {
          email: ['Invalid email address'],
          password: ['Password must be at least 8 characters'],
          confirmPassword: ['Passwords do not match'],
        },
      };
      jest
        .spyOn(require('react'), 'useActionState')
        .mockReturnValue([mockState, () => {}, false]);
      return <Story />;
    },
  ],
};

export const WithServerError: Story = {
  args: {
    formFields: mockFormFields,
  },
  decorators: [
    (Story) => {
      const mockState = {
        status: Status.ERROR,
        message: 'Server error occurred',
        errors: null,
      };
      jest
        .spyOn(require('react'), 'useActionState')
        .mockReturnValue([mockState, () => {}, false]);
      return <Story />;
    },
  ],
};
