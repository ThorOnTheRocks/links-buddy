import { TabProps } from '../../Tab.types';
import styles from './tab.module.css';

export const Tab = ({
  children,
  className,
  disabled,
  ...props
}: TabProps) => {
  return (
    <button
      type="button"
      className={`
        ${styles.tab}
        ${props['aria-selected'] ? styles.selected : ''}
        ${disabled ? styles.disabled : ''}
        ${className ?? ''}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
