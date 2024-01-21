'use client';

import { useCallback, useRef, useState } from 'react';
import styles from './dropdown-field.module.css';
import type { IDropdownFieldProps } from './DropdownField.types';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

export const DropdownField = ({
  className,
  icon,
  iconList,
  dropdownData,
  name,
  onSelect,
  placeholderText,
  defaultValue,
  style,
}: IDropdownFieldProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>('');
  const hiddenInputRef = useRef(null);

  const handleToggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelectedItem = (itemValue: string) => {
    setSelectedItem(itemValue);
    onSelect(itemValue);
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
      <input
        type="hidden"
        ref={hiddenInputRef}
        name={name}
        value={selectedItem}
      />

      <div
        className={`${className} ${dropdownFieldStateCSS}`}
        onClick={handleToggleDropdown}
        style={style}
      >
        <div className={styles.containerDropdownFieldText}>
          {icon && (
            <div className={styles.iconDropdownField}>{icon}</div>
          )}
          <p className={styles.dropdownFieldText}>
            {selectedItem || placeholderText}
          </p>
          <button
            className={`${styles.iconToggleDropdownField} ${
              isOpen ? styles.iconToggleDropdownFieldOpen : ''
            }`}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            <ChevronDownIcon />
          </button>
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
