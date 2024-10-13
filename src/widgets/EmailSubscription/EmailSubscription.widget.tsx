'use client';

import { useRef, useTransition } from 'react';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSubscriptionSchema } from '../../schema/EmailSubscriptionSchema';
import {
  type EmailSubscriptionFormState,
  createEmailSubscription,
  initialFormState,
} from './action';
import { TextField, Alert, SubmitButton } from '@/components';

import styles from './email-subscription.module.css';

import type { EmailSubscriptionForm } from './EmailSubscription.types';
import { useAlert } from '@/components/Alert';

const EmailSubscription = (): React.JSX.Element => {
  const [state, formAction] = useFormState<
    EmailSubscriptionFormState,
    FormData
  >(createEmailSubscription, initialFormState);
  const [isPending, startTransition] = useTransition();

  const alert = useAlert({
    message: state.message,
    status: state.status,
    timestamp: state.timestamp,
    duration: 4000,
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<EmailSubscriptionForm>({
    resolver: zodResolver(EmailSubscriptionSchema),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      email: '',
    },
    ...(state.errors ?? {}),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = handleSubmit(async () => {
    startTransition(async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current!);
        const data = await formAction(formData);
        return data;
      }
    });
    reset({ firstName: '', email: '' });
  });

  return (
    <>
      <form
        key={state.timestamp}
        ref={formRef}
        action={formAction}
        onSubmit={onSubmit}
        className={styles.containerEmailField}
      >
        <Alert alert={alert} className="mb-4" />
        <div>
          <TextField
            {...register('firstName')}
            tabIndex={0}
            aria-label="user-firstName"
            type="text"
            className={styles.emailFieldInput}
            name="firstName"
            placeholder="Enter your name..."
            isError={Boolean(errors.firstName)}
            error={errors.firstName?.message}
          />
          <TextField
            {...register('email')}
            tabIndex={0}
            aria-label="user-email"
            type="email"
            className={styles.emailFieldInput}
            name="email"
            placeholder="Email"
            isError={Boolean(errors.email)}
            error={errors.email?.message}
          />
        </div>
        <SubmitButton
          isPending={isPending}
          className={styles.emailSubmitBtn}
        >
          Subscribe
        </SubmitButton>
      </form>
    </>
  );
};

export default EmailSubscription;
