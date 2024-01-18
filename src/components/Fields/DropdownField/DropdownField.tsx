'use client';

import styles from './text-field.module.css';
import type { IDropdownFieldProps } from './DropdownField.types';

export const DropdownField = ({
  type,
  icon,
}: IDropdownFieldProps): JSX.Element => {
  return (
    <div className={styles.containerTextField}>
      <div className={styles.containerInputTextField}>
        {icon && <div className={styles.iconTexField}>{icon}</div>}
      </div>
    </div>
  );
};
