'use client';

import { Button } from '../Buttons/Button';
import { Icons } from '../Icons/Icons';

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
            <Icons.spinner className="mr-2 h-6 w-6 animate-spin text-center" />
          </>
        ) : (
          <>{children}</>
        )}
      </Button>
    </>
  );
};
