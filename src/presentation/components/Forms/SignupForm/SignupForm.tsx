'use client';

import { startTransition, useActionState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signup } from '@/features/Auth/actions/signup.action';
import {
  signupSchema,
  type SignupFormData,
} from '@/schema/signup.schema';

import { SubmitButton } from '@/presentation/components';
import { TextField } from '../../Fields/TextField/TextField';
import { Mail, Lock } from 'lucide-react';
import styles from './signup.module.css';
import { SignupFormState } from '@/features/Auth/actions/signup.types';

const initialState = {
  status: 'idle' as const,
  message: '',
  errors: null,
};

export const SignupForm = () => {
  const [state, formAction, isPending] = useActionState<
    SignupFormState,
    FormData
  >(signup, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      startTransition(() => {
        formAction(formData);
      });
    }
  };

  console.log({ state });

  return (
    <section className={styles.signupWrapper}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('email')}
          icon={<Mail />}
          type="email"
          name="email"
          id="email"
          label="Email"
          tabIndex={0}
          aria-label="email"
          isError={Boolean(errors?.email)}
          error={errors?.email?.message}
        />
        <TextField
          {...register('password')}
          icon={<Lock />}
          type="password"
          name="password"
          id="password"
          label="Create password"
          htmlFor="password"
          isError={Boolean(errors?.password)}
          error={errors?.password?.message}
        />
        <TextField
          {...register('confirmPassword')}
          icon={<Lock />}
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          htmlFor="confirmPassword"
          isError={Boolean(errors?.confirmPassword)}
          error={errors?.confirmPassword?.message}
        />
        <SubmitButton isPending={isPending}>
          Create new account
        </SubmitButton>
      </form>
    </section>
  );
};
