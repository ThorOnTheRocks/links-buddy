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
  placeholder,
  label,
  isError,
  className,
  ...props
}: ITextFieldProps): JSX.Element => {
  return (
    <>
      {label && (
        <div>
          <label htmlFor={htmlFor}>{label}</label>
        </div>
      )}
      <div className={styles.containerInputTextField}>
        {icon && <div className={styles.iconTexField}>{icon}</div>}
        <input
          id={htmlFor}
          placeholder={placeholder}
          className={`${styles.textField} ${className} ${
            isError ? styles.textFieldError : styles.textFieldNormal
          }`}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          {...props}
        />
      </div>
    </>
  );
};
