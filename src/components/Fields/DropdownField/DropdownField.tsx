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
}: IDropdownFieldProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className={styles.containerDropdownField}
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
  );
};
