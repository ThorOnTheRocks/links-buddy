'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
        ref={dropdownRef}
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
