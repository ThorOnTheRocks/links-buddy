import { useState, useCallback } from 'react';
import {
  UseTabsProps,
  TabProps,
  TabListProps,
  TabPanelProps,
} from '../Tab.types';
import { createKeyboardNavigationHandler } from '../utils/keyboard-navigation';

export const useTabs = ({ defaultTab, onChange }: UseTabsProps) => {
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  const handleTabChange = useCallback(
    (id: string) => {
      setSelectedTab(id);
      onChange?.(id);
    },
    [onChange]
  );

  const getTabProps = useCallback(
    (id: string): Omit<TabProps, 'children'> => ({
      role: 'tab',
      id: `tab-${id}`,
      'aria-selected': selectedTab === id,
      'aria-controls': `panel-${id}`,
      tabIndex: selectedTab === id ? 0 : -1,
      onClick: () => handleTabChange(id),
    }),
    [selectedTab, handleTabChange]
  );

  const getTabListProps = useCallback(
    (
      props: Partial<Omit<TabListProps, 'children'>> = {}
    ): Omit<TabListProps, 'children'> => {
      const orientation = props.orientation || 'horizontal';
      return {
        role: 'tablist',
        'aria-orientation': orientation,
        onKeyDown: createKeyboardNavigationHandler(
          '[role="tab"]',
          orientation
        ),
        ...props,
      };
    },
    []
  );

  const getTabPanelProps = useCallback(
    (id: string): Omit<TabPanelProps, 'children'> => ({
      role: 'tabpanel',
      id: `panel-${id}`,
      'aria-labelledby': `tab-${id}`,
      tabIndex: 0,
      hidden: selectedTab !== id,
    }),
    [selectedTab]
  );

  return {
    selectedTab,
    setSelectedTab: handleTabChange,
    getTabProps,
    getTabListProps,
    getTabPanelProps,
  };
};
