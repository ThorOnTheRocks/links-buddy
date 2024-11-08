import { TabListProps } from '../../Tabs.types';
import styles from './tab-list.module.css';

export const TabList = ({
  children,
  className,
  ...props
}: TabListProps) => {
  return (
    <div
      className={`
        ${styles.tabList}
        ${
          props['aria-orientation'] === 'vertical'
            ? styles.vertical
            : ''
        }
        ${className ?? ''}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
