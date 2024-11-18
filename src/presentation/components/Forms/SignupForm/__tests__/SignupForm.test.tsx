import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mail, Lock } from 'lucide-react';
import { SignupForm } from '../SignupForm';

const mockFormFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    icon: <Mail data-testid="mail-icon" />,
    placeholder: '',
  },
  {
    name: 'password',
    label: 'Create password',
    type: 'password',
    icon: <Lock data-testid="lock-icon" />,
    placeholder: '',
  },
] as const;

jest.mock('@/presentation/components', () => ({
  SubmitButton: ({ children, isPending }: any) => (
    <button disabled={isPending} data-testid="submit-button">
      {children}
    </button>
  ),
  TextField: ({ label, type, error, ...props }: any) => (
    <div>
      <label htmlFor={props.id}>{label}</label>
      <input
        type={type}
        id={props.id}
        data-testid={`${props.name}-input`}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  ),
}));

jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    useActionState: jest
      .fn()
      .mockReturnValue([
        { status: 'idle', message: '', errors: null },
        jest.fn(),
        false,
      ]),
    startTransition: (cb: () => void) => cb(),
  };
});

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: (name: string) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    }),
    handleSubmit: (fn: any) => (e: any) => {
      e.preventDefault();
      return fn();
    },
    formState: { errors: {} },
  }),
}));

jest.mock('@/features/Auth/actions/signup.action', () => ({
  signup: jest.fn(),
}));

describe('SignupForm', () => {
  const mockUseActionState = jest.spyOn(
    require('react'),
    'useActionState'
  );

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseActionState.mockReturnValue([
      { status: 'idle', message: '', errors: null },
      jest.fn(),
      false,
    ]);
  });

  it('should render all form fields correctly', () => {
    render(<SignupForm formFields={mockFormFields} />);

    expect(screen.getByText('Create Account')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const user = userEvent.setup();
    render(<SignupForm formFields={mockFormFields} />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByTestId('submit-button');

    await user.clear(emailInput);
    await user.type(emailInput, 'test@example.com');
    await user.clear(passwordInput);
    await user.type(passwordInput, 'Password123');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('Password123');

    await user.click(submitButton);
  });

  it('should display loading state when submitting', () => {
    mockUseActionState.mockReturnValueOnce([
      { status: 'idle', message: '', errors: null },
      jest.fn(),
      true, // isPending
    ]);

    render(<SignupForm formFields={mockFormFields} />);

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeDisabled();
  });

  it('should display error state', () => {
    jest
      .spyOn(require('react-hook-form'), 'useForm')
      .mockImplementationOnce(() => ({
        register: (name: string) => ({
          name,
          onChange: jest.fn(),
          onBlur: jest.fn(),
          ref: jest.fn(),
        }),
        handleSubmit: (fn: any) => (e: any) => {
          e.preventDefault();
          return fn();
        },
        formState: {
          errors: {
            email: {
              message: 'Invalid email',
            },
          },
        },
      }));

    render(<SignupForm formFields={mockFormFields} />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });
});
