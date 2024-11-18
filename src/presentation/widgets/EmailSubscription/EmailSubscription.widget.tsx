'use client';

import { useRef, startTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import {
  type EmailSubscriptionFormState,
  createEmailSubscription,
  initialFormState,
} from './actions';
import { EmailSubscriptionSchema } from './schema/EmailSubscriptionSchema';
import { EmailSubscriptionForm } from './EmailSubscription.types';
import {
  TextField,
  Alert,
  SubmitButton,
} from '@/presentation/components';
import styles from './email-subscription.module.css';
import { useAlert } from '@/presentation/components/Alert';
import { getCaptchaToken } from '@/utils';

export const EmailSubscription = (): React.JSX.Element => {
  const [state, formAction, isPending] = useActionState<
    EmailSubscriptionFormState,
    FormData
  >(createEmailSubscription, initialFormState);

  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailSubscriptionForm>({
    resolver: zodResolver(EmailSubscriptionSchema),
    mode: 'onSubmit',
  });

  const alert = useAlert({
    message: state.message || '',
    status: state.status,
    trigger: state.trigger,
    duration: 4000,
  });

  useEffect(() => {
    if (state.status === 'success') {
      reset();
    }
  }, [state.status, reset]);

  const onSubmit = handleSubmit(async () => {
    try {
      const token = await getCaptchaToken();

      if (!token) {
        startTransition(() => {
          formAction(new FormData());
        });
        return;
      }

      if (formRef.current) {
        const formData = new FormData(formRef.current);
        formData.append('tokenGRecaptcha', token);

        startTransition(() => {
          formAction(formData);
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      startTransition(() => {
        formAction(new FormData());
      });
    }
  });

  return (
    <>
      <Alert alert={alert} className="mb-4" />

      <section className={styles.containerEmailField}>
        <form ref={formRef} onSubmit={onSubmit}>
          <div className={styles.inputWrapper}>
            <TextField
              {...register('email')}
              type="email"
              name="email"
              tabIndex={0}
              aria-label="user-email"
              className={styles.emailFieldInput}
              placeholder="Enter your email"
              isError={Boolean(errors?.email || state.errors?.email)}
              error={
                errors?.email?.message || state.errors?.email?.[0]
              }
              disabled={isPending}
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
    </>
  );
};
