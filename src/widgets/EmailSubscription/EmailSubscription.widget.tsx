'use client';

import {
  BaseSyntheticEvent,
  useState,
  useEffect,
  useRef,
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

import type { EmailSubscriptionForm } from './EmailSubscription.types';
import type { EmailSubscriptionFormState } from '@/actions/EmailSubscription/EmailSubscriptionState.types';

const initialState: EmailSubscriptionFormState = {
  message: '',
  fields: {},
  errors: undefined,
  resetKey: Date.now().toString(),
};

const EmailSubscription = (): React.JSX.Element => {
  const [state, formAction] = useFormState<
    EmailSubscriptionFormState,
    FormData
  >(createEmailSubscription, initialState);
  const [showAlert, setShowAlert] = useState<boolean>(false);

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

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    handleSubmit(() => {
      formAction(new FormData(formRef.current!));
      setShowAlert(!showAlert);
      reset({ email: '' });
    })(e);
  };

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(!showAlert);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [showAlert]);

  return (
    <>
      <div className="mt-10 w-1/3">
        {showAlert && (
          <Alert
            variant={
              Boolean(state.success) ? 'default' : 'destructive'
            }
          >
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>
              {Boolean(state.success) ? 'Success' : 'Error'}
            </AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
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
