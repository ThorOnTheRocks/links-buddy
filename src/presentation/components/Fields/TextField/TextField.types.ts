import { InputHTMLAttributes, ReactNode } from 'react';

export interface ITextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
  icon?: ReactNode;
  isError?: boolean;
  error?: string;
}
