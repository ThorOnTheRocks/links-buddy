import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LinkIcon, MapPinIcon } from '@heroicons/react/16/solid';
import { DropdownField } from './DropdownField';
import type { IDropdownFieldProps } from './DropdownField.types';

const meta: Meta<typeof DropdownField> = {
  title: 'Fields/DropdownField',
  component: DropdownField,
};

export default meta;
type Story = StoryObj<typeof DropdownField>;

const DropdownFieldWithHooks = ({
  dropdownData,
  onSelect,
  ...props
}: IDropdownFieldProps) => {
  const [, setSelectedItem] = useState('');

  const handleSelectItem = (itemValue: string) => {
    setSelectedItem(itemValue);
  };

  return (
    <DropdownField
      dropdownData={dropdownData}
      onSelect={handleSelectItem}
      {...props}
    />
  );
};

export const DefaultDropdownField: Story = {
  args: {
    dropdownData: ['Option 1', 'Option 2', 'Option 3'],
    placeholderText: 'Select your option...',
  },
  render: ({ ...args }) => <DropdownFieldWithHooks {...args} />,
};

export const DropdownFieldWithDefaultValue: Story = {
  args: {
    placeholderText: 'Select your option...',
    dropdownData: ['Option 1', 'Option 2', 'Option 3'],
    defaultValue: 'Option 2',
  },
  render: ({ ...args }) => <DropdownFieldWithHooks {...args} />,
};

export const DropdownFieldWithIcon: Story = {
  args: {
    placeholderText: 'Select your option...',
    dropdownData: ['Option 1', 'Option 2', 'Option 3'],
    icon: <LinkIcon />,
  },
  render: ({ ...args }) => <DropdownFieldWithHooks {...args} />,
};

export const DropdownFieldWithIconList: Story = {
  args: {
    placeholderText: 'Select your option...',
    dropdownData: ['Option 1', 'Option 2', 'Option 3'],
    icon: <LinkIcon />,
    iconList: <MapPinIcon className="h-6 w-6" />,
  },
  render: ({ ...args }) => <DropdownFieldWithHooks {...args} />,
};
