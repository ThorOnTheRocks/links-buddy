import { Button } from '@/presentation/components';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import styles from './oauth-buttons.module.css';

interface IOauthButtons {
  labelBtn: string;
}

export const OauthButtons = ({ labelBtn }: IOauthButtons) => {
  return (
    <div className={styles.buttonOAuthWrapper}>
      <Button
        type="button"
        className={styles.buttonOAuth}
        variant="secondary"
        onClick={() => {
          window.location.href = '/api/login/github';
        }}
      >
        <FaGithub className={styles.iconOAuth} />
        {labelBtn} with Github
      </Button>

      <Button
        type="button"
        className={styles.buttonOAuth}
        variant="secondary"
        onClick={() => {
          window.location.href = '/api/login/google';
        }}
      >
        <FaGoogle className={styles.iconOAuth} />
        {labelBtn} with Google
      </Button>
    </div>
  );
};
