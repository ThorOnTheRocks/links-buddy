'use client';

import {
  ReactNode,
  startTransition,
  useActionState,
  useRef,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signup } from '@/features/Auth/actions/signup.action';
import {
  signupSchema,
  type SignupFormData,
} from '@/schema/signup.schema';

import { SubmitButton } from '@/presentation/components';
import { TextField } from '../../Fields/TextField/TextField';
import styles from './signup.module.css';
import { SignupFormState } from '@/features/Auth/actions/signup.types';
import type { ISignupFormProps } from './SignupForm.types';
import { INITIAL_STATE } from './SignupForm.constants';

export const SignupForm = ({
  formFields,
}: ISignupFormProps): ReactNode => {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState<
    SignupFormState,
    FormData
  >(signup, INITIAL_STATE);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
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
        <h2 className={styles.signupTitle}>Create Account</h2>
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
              Create new account
            </SubmitButton>
          </div>
        </form>
      </div>
    </section>
  );
};
