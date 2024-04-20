'use client';

import { useFormState } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { emailSubscriptionSchema } from '@/schema/emailSubscriptionSchema';
import { TextField } from '@/components/Fields/TextField/TextField';
import { saveEmailSubscription } from '@/actions/EmailSubscription/saveEmailSubscription';
import Button from '@/components/Buttons/Button';
import styles from './email-subscription.module.css';

import type { EmailSubscriptionForm } from './EmailSubscription.types';
import { BaseSyntheticEvent, useRef } from 'react';

const EmailSubscription = (): React.JSX.Element => {
  const [state, formAction] = useFormState(saveEmailSubscription, {
    message: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailSubscriptionForm>({
    resolver: zodResolver(emailSubscriptionSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    ...(state.field ?? {}),
  });

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    handleSubmit(() => {
      formAction(new FormData(formRef.current!));
    })(e);
  };

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      {!state.message ? (
        <form
          ref={formRef}
          action={formAction}
          onSubmit={onSubmit}
          className={styles.containerEmailField}
        >
          <TextField
            {...register('email')}
            type="email"
            className={styles.emailFieldInput}
            name="email"
            placeholder="Email"
            isError={Boolean(errors.email)}
            error={errors.email?.message}
          />
          <Button type="submit" className={styles.emailSubmitBtn}>
            Subscribe
          </Button>
        </form>
      ) : (
        <div>{state.message}</div>
      )}
    </>
  );
};

export default EmailSubscription;
