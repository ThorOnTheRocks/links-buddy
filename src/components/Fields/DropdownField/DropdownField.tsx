'use client';

import { useCallback, useState } from 'react';
import styles from './dropdown-field.module.css';
import type { IDropdownFieldProps } from './DropdownField.types';
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/16/solid';

export const DropdownField = ({
  icon,
  iconList,
  dropdownData = ['Github', 'Linkedin', 'Facebook'],
  placeholderText,
}: IDropdownFieldProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleToggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectedItem = (itemValue: string) => {
    setSelectedItem(itemValue);
    setIsOpen((prev) => !prev);
  };

  const dropdownFieldStateCSS = isOpen
    ? `${styles.containerDropdownField} ${styles.dropdownFieldOpen}`
    : styles.containerDropdownField;

  const itemsListRendered = dropdownData?.length ? (
    dropdownData.map((item, index) => (
      <li
        key={`${item}-${index}`}
        className={styles.dropdownFieldListItem}
      >
        <button
          type="button"
          onClick={() => handleSelectedItem(item)}
        >
          {iconList}
          {item}
        </button>
      </li>
    ))
  ) : (
    <li className={styles.dropdownFieldListItem}>No Item</li>
  );

  return (
    <>
      <div
        className={dropdownFieldStateCSS}
        onClick={handleToggleDropdown}
      >
        <div className={styles.containerDropdownFieldText}>
          {icon && (
            <div className={styles.iconDropdownField}>{icon}</div>
          )}
          <p className={styles.dropdownFieldText}>
            {selectedItem || placeholderText}
          </p>
          <div className={styles.iconToggleDropdownField}>
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.containerDropdownFieldList}>
          <ul>{itemsListRendered}</ul>
        </div>
      )}
    </>
  );
};
