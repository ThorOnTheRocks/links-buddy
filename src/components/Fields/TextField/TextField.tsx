'use client';

import { forwardRef } from 'react';
import styles from './text-field.module.css';
import type { ITextFieldProps } from './TextField.types';

export const TextField = forwardRef<
  HTMLInputElement,
  ITextFieldProps
>(
  (
    {
      type,
      value,
      htmlFor,
      icon,
      name,
      onChange,
      placeholder,
      label,
      error,
      isError,
      className,
      ...props
    },
    ref
  ): JSX.Element => {
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
            ref={ref}
            aria-invalid={isError ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />
          {error ? (
            <span className={styles.textFieldErrorText}>{error}</span>
          ) : null}
        </div>
      </>
    );
  }
);

TextField.displayName = 'TextField';
