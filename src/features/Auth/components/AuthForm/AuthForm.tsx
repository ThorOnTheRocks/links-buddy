'use client';

import {
  ReactNode,
  startTransition,
  useActionState,
  useRef,
} from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signup, signin } from '@/features/Auth/actions/auth.action';
import {
  signupSchema,
  signInSchema,
  type SignupFormData,
} from '@/schema/auth.schema';

import { SubmitButton, TextField } from '@/presentation/components';
import styles from './auth-form.module.css';
import {
  SignupFormState,
  SigninFormState,
} from '@/features/Auth/actions/auth.types';
import type { IAuthFormProps } from './AuthForm.types';
import {
  INITIAL_SIGNIN_STATE,
  INITIAL_SIGNUP_STATE,
} from './AuthForm.constants';

export const AuthForm = ({
  formFields,
}: IAuthFormProps): ReactNode => {
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
  const isSignup = pathname === '/signup';

  const serverAction = isSignup ? signup : signin;
  const INITIAL_STATE = isSignup
    ? INITIAL_SIGNUP_STATE
    : INITIAL_SIGNIN_STATE;

  const [_state, formAction, isPending] = useActionState<
    SignupFormState | SigninFormState,
    FormData
  >(serverAction, INITIAL_STATE);

  const schema = isSignup ? signupSchema : signInSchema;

  const config = {
    title: isSignup ? 'Create Your Account' : 'Welcome Back',
    buttonText: isSignup ? 'Create account' : 'Continue',
    secondaryText: isSignup
      ? 'Already have an account?'
      : "Don't have an account?",
    secondaryLinkText: isSignup ? 'Log in' : 'Sign Up',
    secondaryLink: isSignup ? '/signin' : '/signup',
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      startTransition(() => formAction(formData));
    }
  };

  return (
    <section className={styles.signupWrapper}>
      <div className={styles.formContainer}>
        <h2 className={styles.signupTitle}>{config.title}</h2>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
        >
          {formFields.map(
            ({ name, label, type, icon, placeholder }) => (
              <div key={name} className={styles.fieldContainer}>
                <TextField
                  {...register(name as keyof SignupFormData)}
                  icon={icon}
                  type={type}
                  name={name}
                  id={name}
                  label={label}
                  placeholder={placeholder}
                  htmlFor={name}
                  isError={Boolean(
                    errors[name as keyof SignupFormData]
                  )}
                  error={
                    errors[name as keyof SignupFormData]?.message
                  }
                  className={styles.signupFields}
                />
              </div>
            )
          )}

          <div className={styles.buttonWrapper}>
            <SubmitButton isPending={isPending}>
              {config.buttonText}
            </SubmitButton>
          </div>
        </form>
        <div className={styles.secondaryTextWrapper}>
          <span>{config.secondaryText} </span>
          <Link href={config.secondaryLink}>
            {config.secondaryLinkText}
          </Link>
        </div>
      </div>
    </section>
  );
};
