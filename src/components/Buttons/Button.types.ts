export interface IButtonProps {
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  children?: React.ReactNode;
  isDisabled?: boolean;
}

export type ButtonVariant = {
  variant: 'primary' | 'secondary';
};
