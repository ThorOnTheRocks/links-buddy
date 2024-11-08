'use client';

import {
  useEffect,
  useRef,
  startTransition,
  useActionState,
} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSubscriptionSchema } from '../../schema/EmailSubscriptionSchema';
import {
  type EmailSubscriptionFormState,
  createEmailSubscription,
  initialFormState,
} from './action';
import { useRecaptcha } from '@/hooks/useRecaptcha';
import { TextField, Alert, SubmitButton } from '@/components';

import styles from './email-subscription.module.css';

import type { EmailSubscriptionForm } from './EmailSubscription.types';
import { useAlert } from '@/components/Alert';

const EmailSubscription = (): React.JSX.Element => {
  const [state, formAction, isPending] = useActionState<
    EmailSubscriptionFormState,
    FormData
  >(createEmailSubscription, initialFormState);
  const { executeRecaptcha } = useRecaptcha();

  const alert = useAlert({
    message: state.message,
    status: state.status,
    trigger: state.trigger,
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

  const onSubmit = handleSubmit(async () => {
    try {
      if (formRef.current) {
        // Get reCAPTCHA token before submitting
        const token = await executeRecaptcha('email_subscription');

        const formData = new FormData(formRef.current);
        // Add the reCAPTCHA token to the form data
        formData.append('recaptchaToken', token);

        startTransition(() => {
          formAction(formData);
        });
      }
    } catch (error) {
      console.error('ReCAPTCHA error:', error);
    }
  });

  useEffect(() => {
    if (state.status === 'success') {
      reset({ email: '' });
    }
  }, [state, reset]);

  return (
    <>
      <Alert alert={alert} className="mb-4" />

      <section className={styles.containerEmailField}>
        <form action={formAction} ref={formRef} onSubmit={onSubmit}>
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
    </>
  );
};

export default EmailSubscription;
