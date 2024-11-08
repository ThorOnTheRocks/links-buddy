import { ButtonHTMLAttributes } from 'react';
export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children?: React.ReactNode;
  isDisabled?: boolean;
}

export type ButtonVariant = {
  variant: 'primary' | 'secondary';
};
