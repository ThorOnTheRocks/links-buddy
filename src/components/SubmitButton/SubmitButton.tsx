'use client';

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
    <>
      <Button
        tabIndex={0}
        type="submit"
        disabled={isPending}
        className={className}
      >
        {isPending ? (
          <>
            <Icons.spinner
              className={`${styles.submitBtnIcon} ${styles.spinner} w-8 h-8 mr-2`}
            />
          </>
        ) : (
          <>{children}</>
        )}
      </Button>
    </>
  );
};
