'use client';

import { useState } from 'react';
import styles from './dropdown-field.module.css';
import type { IDropdownFieldProps } from './DropdownField.types';
import {
  ChevronUpIcon,
  ChevronDownIcon,
} from '@heroicons/react/16/solid';

export const DropdownField = ({
  icon,
  dropdownData = ['Github', 'Facebook', 'Linkedin'],
}: IDropdownFieldProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const dropdownFieldStateCSS = isOpen
    ? `${styles.containerDropdownField} ${styles.dropdownFieldOpen}`
    : styles.containerDropdownField;

  const itemsListRendered = dropdownData.map((item, index) => (
    <>
      <li key={index} className={styles.dropdownFieldListItem}>
        {item}
      </li>
    </>
  ));

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
          <p>placeholder</p>
          <div className={styles.iconToggleDropdownField}>
            {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.containerDropdownFieldList}>
          <ul>
            {dropdownData.length ? (
              itemsListRendered
            ) : (
              <li className={styles.dropdownFieldListItem}>
                No Items
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
