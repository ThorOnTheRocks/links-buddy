import { ReactNode } from 'react';

export interface ITabProps {
  id: string;
  label: string;
  tabIndex: number;
  ariaSelected: boolean;
  ariaControls: string;
  children?: ReactNode;
}

export interface ITabPanelProps {
  id: string;
  label: string;
  tabIndex: number;
  ariaLabelledBy: string;
  children: ReactNode;
}
