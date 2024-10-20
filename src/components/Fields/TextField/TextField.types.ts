import { InputHTMLAttributes } from 'react';

export interface ITextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
  icon?: JSX.Element;
  isError?: boolean;
  error?: string | undefined;
}
