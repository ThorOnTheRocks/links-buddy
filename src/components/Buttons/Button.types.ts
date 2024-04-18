export interface IButtonProps {
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  children?: React.ReactNode;
  variant: 'primary' | 'secondary';
}

export type ButtonVariant = {
  variant: 'primary' | 'secondary';
};
