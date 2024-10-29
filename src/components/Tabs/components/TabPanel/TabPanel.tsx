import { TabPanelProps } from '../../Tab.types';
import styles from './tab-panel.module.css';

export const TabPanel = ({
  children,
  className,
  hidden,
  ...props
}: TabPanelProps) => {
  return (
    <div
      role="tabpanel"
      className={`
        ${styles.tabPanel}
        ${!hidden ? styles.visible : ''}
        ${className ?? ''}
      `}
      hidden={hidden || undefined}
      {...props}
    >
      {!hidden && children}
    </div>
  );
};
