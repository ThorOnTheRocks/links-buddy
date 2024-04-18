import type { IButtonProps } from './Button.types';

import styles from './button.module.css';

const Button = ({
  children,
  variant,
  className,
  ...props
}: IButtonProps): React.JSX.Element => {
  const buttonClass =
    variant === 'primary' ? styles.btnPrimary : styles.btnSecondary;

  return (
    <button className={`${styles.btn} ${buttonClass}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
