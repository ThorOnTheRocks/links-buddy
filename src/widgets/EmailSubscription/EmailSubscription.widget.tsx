'use client';

import {
  BaseSyntheticEvent,
  useState,
  useEffect,
  useRef,
  Suspense,
} from 'react';
import { useFormState } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { emailSubscriptionSchema } from '@/schema/emailSubscriptionSchema';
import { createEmailSubscription } from '@/actions/EmailSubscription/createEmailSubscription';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import {
  Button,
  TextField,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/components';

import styles from './email-subscription.module.css';

import type {
  EmailSubscriptionForm,
  EmailSubscriptionAlertState,
} from './EmailSubscription.types';
import type { EmailSubscriptionFormState } from '@/actions/EmailSubscription/EmailSubscriptionState.types';

const initialState: EmailSubscriptionFormState = {
  message: '',
  fields: {},
  errors: undefined,
  resetKey: '',
};

const initialAlertState: EmailSubscriptionAlertState = {
  show: false,
  type: 'default',
  title: '',
  message: '',
};

const EmailSubscription = (): React.JSX.Element => {
  const [state, formAction] = useFormState<
    EmailSubscriptionFormState,
    FormData
  >(createEmailSubscription, initialState);
  const [alert, setAlert] =
    useState<EmailSubscriptionAlertState>(initialAlertState);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<EmailSubscriptionForm>({
    resolver: zodResolver(emailSubscriptionSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
    ...(state.fields ?? {}),
  });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    handleSubmit(() => {
      formAction(new FormData(formRef.current!));
      reset({ email: '' });
    })(e);
  };

  useEffect(() => {
    if (state.message) {
      if (state.status === 'error') {
        setAlert((prev) => ({
          ...prev,
          show: true,
          type: 'destructive',
          title: 'Error',
          message: state.message,
        }));
      } else {
        setAlert((prev) => ({
          ...prev,
          show: true,
          type: 'default',
          title: 'Success',
          message: state.message,
        }));
      }
    }
  }, [state.status, state.message]);

  useEffect(() => {
    if (alert.show) {
      const timeout = setTimeout(() => {
        setAlert({
          ...alert,
          show: false,
        });
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [alert.show]);

  return (
    <>
      <div
        className="mt-10 w-1/3"
        style={{ position: 'absolute', top: 0 }}
      >
        {alert.show && (
          <Alert variant={alert.type}>
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}
      </div>
      <form
        key={state.resetKey}
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
    </>
  );
};

export default EmailSubscription;
