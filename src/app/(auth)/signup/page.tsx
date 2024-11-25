import { AuthForm } from '@/features/Auth/components/AuthForm/AuthForm';
import { FORM_FIELDS } from './_signup-page.constants';
import Image from 'next/image';
import styles from '../auth-page.module.css';

export default function SignUp() {
  return (
    <section className={styles.signupPageWrapper}>
      <Image
        priority
        src="/assets/Logo Files/svg/logo-no-background.svg"
        alt="LinksBuddy Logo"
        width={200}
        height={200}
        className={styles.logo}
        aria-hidden="true"
      />

      <AuthForm formFields={FORM_FIELDS} />
    </section>
  );
}
