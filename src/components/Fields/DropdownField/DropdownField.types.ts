export interface IDropdownFieldProps {
  dropdownData: string[];
  onSelect: (selectedItem: string) => void;
  icon?: JSX.Element;
  iconList?: JSX.Element | string;
  placeholderText?: string;
  defaultValue?: string;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  name?: string;
}
