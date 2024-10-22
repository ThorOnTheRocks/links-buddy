'use client';

import { useEffect, useRef, useTransition } from 'react';
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
      email: '',
    },
    ...(state.errors ?? {}),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = handleSubmit(() => {
    startTransition(async () => {
      if (formRef.current) {
        const formData = new FormData(formRef.current!);
        await formAction(formData);
      }
    });
  });

  useEffect(() => {
    if (state.status === 'success') {
      reset({ email: '' });
    }
  }, [state, reset]);

  return (
    <div>
      <Alert alert={alert} className="mb-4" />

      <section className={styles.containerEmailField}>
        <form
          key={state.timestamp}
          ref={formRef}
          action={formAction}
          onSubmit={onSubmit}
        >
          <div className={styles.inputWrapper}>
            <TextField
              {...register('email')}
              tabIndex={0}
              aria-label="user-email"
              type="email"
              className={styles.emailFieldInput}
              name="email"
              placeholder="Enter your email"
              isError={Boolean(errors?.email)}
              error={errors?.email?.message}
            />

            <SubmitButton
              isPending={isPending}
              className={styles.emailSubmitBtn}
            >
              Get early access
            </SubmitButton>
          </div>
        </form>
      </section>
    </div>
  );
};

export default EmailSubscription;
