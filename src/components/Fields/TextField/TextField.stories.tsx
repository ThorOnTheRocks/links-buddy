import React, { ChangeEvent, ReactNode, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LinkIcon } from '@heroicons/react/16/solid';
import { TextField } from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Fields/TextField',
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const TextFieldEmpty: Story = {
  args: {
    value: '',
    name: 'empty',
    onChange: (e: ChangeEvent<HTMLInputElement>) => e.target.value,
    label: 'Empty TextField:',
  },
};

export const TextFieldErrorState: Story = {
  args: {
    value: 'Error Value',
    name: 'error',
    isError: true,
    onChange: (e: ChangeEvent<HTMLInputElement>) => e.target.value,
    label: 'Error TextField:',
    icon: <LinkIcon />,
  },
};

export const TextFieldWithIcon: Story = {
  args: {
    value: '',
    name: 'icon',
    onChange: (e: ChangeEvent<HTMLInputElement>) => e.target.value,
    label: 'TextField with Icon:',
    icon: <LinkIcon />,
  },
};
