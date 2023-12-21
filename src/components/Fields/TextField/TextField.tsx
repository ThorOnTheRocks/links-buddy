'use client';

import styles from './text-field.module.css';
import type { ITextFieldProps } from './TextField.types';

export const TextField = ({
  type,
  value,
  htmlFor,
  icon,
  name,
  onChange,
  label,
  isError = false,
  ...props
}: ITextFieldProps): JSX.Element => {
  return (
    <div className={styles.containerTextField}>
      {label && <label htmlFor={htmlFor}>{label}</label>}
      {icon && <div className={styles.iconTexField}>{icon}</div>}
      <input
        id={htmlFor}
        className={`${styles.textField} ${
          isError ? styles.textFieldError : ''
        }`}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};
