import {
  ButtonHTMLAttributes,
  HTMLAttributes,
  ReactNode,
} from 'react';

export interface TabProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export interface TabListProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export interface TabPanelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode;
  className?: string;
}

export interface UseTabsProps {
  defaultTab: string;
  onChange?: (id: string) => void;
}
