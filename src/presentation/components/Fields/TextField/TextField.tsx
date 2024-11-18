import { forwardRef } from 'react';
import { ITextFieldProps } from './TextField.types';
import styles from './text-field.module.css';

export const TextField = forwardRef<
  HTMLInputElement,
  ITextFieldProps
>(
  (
    {
      type = 'text',
      value,
      htmlFor,
      icon,
      name,
      onChange,
      placeholder,
      label,
      error,
      isError,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || htmlFor || name;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={styles.container}>
        {label && (
          <div className={styles.labelWrapper}>
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
          </div>
        )}
        <div className={styles.containerInputTextField}>
          <div className={styles.inputWrapper}>
            {icon && (
              <div className={styles.iconTexField}>{icon}</div>
            )}
            <input
              ref={ref}
              id={inputId}
              type={type}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={`${styles.textField} ${
                icon ? styles.textFieldWithIcon : ''
              } ${
                isError
                  ? styles.textFieldError
                  : styles.textFieldNormal
              } ${className}`}
              aria-invalid={isError ? 'true' : 'false'}
              aria-describedby={errorId}
              {...props}
            />
          </div>
          {error && (
            <span id={errorId} className={styles.textFieldErrorText}>
              {error}
            </span>
          )}
        </div>
      </div>
    );
  }
);

TextField.displayName = 'TextField';
