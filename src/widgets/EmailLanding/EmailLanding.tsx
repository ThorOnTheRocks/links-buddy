'use client';

import { TextField } from '@/components/Fields/TextField/TextField';
import Button from '@/components/Buttons/Button';
import styles from './email-landing.module.css';

const EmailLanding = (): React.JSX.Element => {
  return (
    <div className={styles.containerEmailField}>
      <TextField
        type="email"
        onChange={(e) => e.target.value}
        name="email"
        placeholder="Email"
        value=""
        className={styles.emailFieldInput}
      />
      <Button className={styles.emailSubmitBtn} onClick={() => {}}>
        Subscribe
      </Button>
    </div>
  );
};

export default EmailLanding;
