import { ReactNode } from 'react';

export interface IDropdownFieldProps {
  dropdownData: string[];
  onSelect: (selectedItem: string) => void;
  icon?: ReactNode;
  iconList?: ReactNode | string;
  placeholderText?: string;
  defaultValue?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
}
