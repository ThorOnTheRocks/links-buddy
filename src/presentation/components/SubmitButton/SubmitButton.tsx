import { Button } from '../Buttons/Button';
import { Icons } from '../Icons/Icons';
import styles from './submit-button.module.css';

interface ILoadingButton {
  isPending: boolean;
  children: React.ReactNode;
  className?: string | undefined;
}

export const SubmitButton = ({
  isPending,
  className,
  children,
}: ILoadingButton) => {
  return (
    <Button
      tabIndex={0}
      type="submit"
      isDisabled={isPending}
      className={`${className} ${styles.submitButtonContainer}`}
    >
      <div className={styles.buttonContent}>
        {isPending ? (
          <div className={styles.spinnerWrapper}>
            <Icons.spinner
              className={`${styles.submitBtnIcon} ${styles.spinner}`}
            />
          </div>
        ) : (
          <div className={styles.childrenWrapper}>{children}</div>
        )}
      </div>
    </Button>
  );
};
