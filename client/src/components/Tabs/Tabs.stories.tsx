import type { Meta, StoryObj } from '@storybook/react';
import { Tab, TabList, TabPanel } from './components';
import { useTabs } from './hooks/useTabs';
import { Settings, User, Bell, CreditCard } from 'lucide-react';
import { useState } from 'react';

const meta: Meta = {
  title: 'Components/Tabs',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accessible and keyboard navigable tab component with a modern button-style design.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

const BasicTabs = () => {
  const { getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    defaultTab: 'account',
    onChange: (tab: string) => console.log(`Selected tab: ${tab}`),
  });

  return (
    <div style={{ width: '600px' }}>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps('account')}>Account</Tab>
        <Tab {...getTabProps('security')}>Security</Tab>
        <Tab {...getTabProps('notifications')}>Notifications</Tab>
      </TabList>

      <TabPanel {...getTabPanelProps('account')}>
        <div style={{ marginTop: '24px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Account Settings
          </h3>
          <p style={{ color: 'var(--color-neutral-600)' }}>
            Manage your account preferences here.
          </p>
        </div>
      </TabPanel>

      <TabPanel {...getTabPanelProps('security')}>
        <div style={{ marginTop: '24px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Security Settings
          </h3>
          <p style={{ color: 'var(--color-neutral-600)' }}>
            Update your security preferences.
          </p>
        </div>
      </TabPanel>

      <TabPanel {...getTabPanelProps('notifications')}>
        <div style={{ marginTop: '24px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Notification Preferences
          </h3>
          <p style={{ color: 'var(--color-neutral-600)' }}>
            Control how you receive notifications.
          </p>
        </div>
      </TabPanel>
    </div>
  );
};

const IconTabs = () => {
  const { getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    defaultTab: 'account',
  });

  return (
    <div style={{ width: '600px' }}>
      <TabList {...getTabListProps()}>
        <Tab {...getTabProps('account')}>
          <User size={16} />
          Account
        </Tab>
        <Tab {...getTabProps('security')}>
          <Settings size={16} />
          Security
        </Tab>
        <Tab {...getTabProps('notifications')}>
          <Bell size={16} />
          Notifications
        </Tab>
        <Tab {...getTabProps('billing')} disabled>
          <CreditCard size={16} />
          Billing
        </Tab>
      </TabList>

      <TabPanel {...getTabPanelProps('account')}>
        <div style={{ marginTop: '24px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Account Settings
          </h3>
          <div
            style={{
              padding: '24px',
              backgroundColor: 'var(--color-neutral-100)',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'var(--color-neutral-900)',
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--color-neutral-200)',
                    borderRadius: '4px',
                    fontSize: 'var(--body-font-regular-md)',
                  }}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'var(--color-neutral-900)',
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid var(--color-neutral-200)',
                    borderRadius: '4px',
                    fontSize: 'var(--body-font-regular-md)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel {...getTabPanelProps('security')}>
        <div style={{ marginTop: '24px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Security Settings
          </h3>
          <div
            style={{
              padding: '24px',
              backgroundColor: 'var(--color-neutral-100)',
              borderRadius: '8px',
            }}
          >
            <div style={{ marginBottom: '24px' }}>
              <h4
                style={{
                  margin: '0 0 8px',
                  color: 'var(--color-neutral-900)',
                }}
              >
                Two-Factor Authentication
              </h4>
              <p
                style={{
                  margin: '0 0 16px',
                  color: 'var(--color-neutral-600)',
                }}
              >
                Add an extra layer of security to your account
              </p>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: 'var(--body-font-regular-md)',
                }}
              >
                Enable 2FA
              </button>
            </div>
            <div>
              <h4
                style={{
                  margin: '0 0 8px',
                  color: 'var(--color-neutral-900)',
                }}
              >
                Password
              </h4>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-primary)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: 'var(--body-font-regular-md)',
                }}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel {...getTabPanelProps('notifications')}>
        <div style={{ marginTop: '24px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Notification Preferences
          </h3>
          <div
            style={{
              padding: '24px',
              backgroundColor: 'var(--color-neutral-100)',
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-neutral-900)',
                  cursor: 'pointer',
                }}
              >
                <input type="checkbox" defaultChecked />
                Email notifications
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-neutral-900)',
                  cursor: 'pointer',
                }}
              >
                <input type="checkbox" defaultChecked />
                Push notifications
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-neutral-900)',
                  cursor: 'pointer',
                }}
              >
                <input type="checkbox" />
                SMS notifications
              </label>
            </div>
          </div>
        </div>
      </TabPanel>

      <TabPanel {...getTabPanelProps('billing')}>
        <div style={{ marginTop: '24px' }}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Billing Information
          </h3>
          <div
            style={{
              padding: '24px',
              backgroundColor: 'var(--color-neutral-100)',
              borderRadius: '8px',
            }}
          >
            <p
              style={{ color: 'var(--color-neutral-600)', margin: 0 }}
            >
              Please contact support to manage billing settings
            </p>
          </div>
        </div>
      </TabPanel>
    </div>
  );
};

const VerticalTabs = () => {
  const { getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    defaultTab: 'account',
  });

  return (
    <div
      style={{
        width: '600px',
        display: 'flex',
        gap: '24px',
        backgroundColor: 'var(--color-neutral-100)',
        padding: '24px',
        borderRadius: '8px',
      }}
    >
      <TabList {...getTabListProps({ orientation: 'vertical' })}>
        <Tab {...getTabProps('account')}>
          <User size={16} />
          Account
        </Tab>
        <Tab {...getTabProps('security')}>
          <Settings size={16} />
          Security
        </Tab>
        <Tab {...getTabProps('notifications')}>
          <Bell size={16} />
          Notifications
        </Tab>
      </TabList>

      <div style={{ flex: 1 }}>
        <TabPanel {...getTabPanelProps('account')}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Account Settings
          </h3>
          <p style={{ color: 'var(--color-neutral-600)' }}>
            Manage your account preferences here.
          </p>
        </TabPanel>
        <TabPanel {...getTabPanelProps('security')}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Security Settings
          </h3>
          <p style={{ color: 'var(--color-neutral-600)' }}>
            Update your security preferences.
          </p>
        </TabPanel>
        <TabPanel {...getTabPanelProps('notifications')}>
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Notification Preferences
          </h3>
          <p style={{ color: 'var(--color-neutral-600)' }}>
            Control how you receive notifications.
          </p>
        </TabPanel>
      </div>
    </div>
  );
};

const ControlledTabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const { getTabListProps, getTabProps, getTabPanelProps } = useTabs({
    defaultTab: activeTab,
    onChange: (tab: string) => {
      console.log(`Tab changed to: ${tab}`);
      setActiveTab(tab);
    },
  });

  return (
    <div style={{ width: '600px' }}>
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('tab1')}
          style={{
            marginRight: '8px',
            padding: '8px 16px',
            backgroundColor:
              activeTab === 'tab1'
                ? 'var(--color-primary)'
                : 'transparent',
            color:
              activeTab === 'tab1' ? 'white' : 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: 'var(--body-font-regular-md)',
          }}
        >
          Set Tab 1
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          style={{
            padding: '8px 16px',
            backgroundColor:
              activeTab === 'tab2'
                ? 'var(--color-primary)'
                : 'transparent',
            color:
              activeTab === 'tab2' ? 'white' : 'var(--color-primary)',
            border: '1px solid var(--color-primary)',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: 'var(--body-font-regular-md)',
          }}
        >
          Set Tab 2
        </button>
      </div>

      <TabList {...getTabListProps()}>
        <Tab {...getTabProps('tab1')}>First Tab</Tab>
        <Tab {...getTabProps('tab2')}>Second Tab</Tab>
      </TabList>

      <TabPanel {...getTabPanelProps('tab1')}>
        <div
          style={{
            marginTop: '24px',
            padding: '24px',
            backgroundColor: 'var(--color-primary-light)',
            borderRadius: '8px',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            First Tab Content
          </h3>
          <p style={{ color: 'var(--color-neutral-600)', margin: 0 }}>
            This tab can be controlled using the buttons above.
          </p>
        </div>
      </TabPanel>
      <TabPanel {...getTabPanelProps('tab2')}>
        <div
          style={{
            marginTop: '24px',
            padding: '24px',
            backgroundColor: 'var(--color-secondary-light)',
            borderRadius: '8px',
          }}
        >
          <h3
            style={{
              margin: '0 0 16px',
              color: 'var(--color-neutral-900)',
            }}
          >
            Second Tab Content
          </h3>
          <p style={{ color: 'var(--color-neutral-600)', margin: 0 }}>
            This demonstrates controlled tab behavior.
          </p>
        </div>
      </TabPanel>
    </div>
  );
};

export const Basic: StoryObj = {
  render: () => <BasicTabs />,
};

export const WithIcons: StoryObj = {
  render: () => <IconTabs />,
};

export const Vertical: StoryObj = {
  render: () => <VerticalTabs />,
};

export const Controlled: StoryObj = {
  render: () => <ControlledTabs />,
};
