import {
  HTMLInputTypeAttribute,
  ChangeEventHandler,
  ReactNode,
} from 'react';

export interface ITextFieldProps {
  type: HTMLInputTypeAttribute;
  name: string;
  value: string;
  htmlFor?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  isError?: boolean;
  isRequired?: boolean;
  minLength?: number;
  maxLength?: number;
  size?: number;
  style?: React.CSSProperties;
  icon?: JSX.Element;
  placeholder?: string;
}
