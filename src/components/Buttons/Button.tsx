import type { IButtonProps } from './Button.types';

import styles from './button.module.css';

const Button = ({
  children,
  variant = 'primary',
  className,
  onClick,
  isDisabled = false,
  type,
  ...props
}: IButtonProps): React.JSX.Element => {
  const buttonClass = isDisabled
    ? variant === 'primary'
      ? styles.btnPrimaryDisabled
      : styles.btnSecondaryDisabled
    : variant === 'primary'
    ? styles.btnPrimary
    : styles.btnSecondary;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={!isDisabled ? onClick : undefined}
      className={`${styles.btn} ${buttonClass} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
