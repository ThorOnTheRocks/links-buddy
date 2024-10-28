import { ReactNode } from 'react';

export interface ITabListProps {
  children: ReactNode;
}

export const TabList = ({ children }: ITabListProps) => {
  return <div>{children}</div>;
};
