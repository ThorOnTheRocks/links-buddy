import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonPrimary: Story = {
  args: {
    variant: 'primary',
    name: 'button-primary',
    onClick: () => {},
    'aria-label': 'button',
    children: 'Button Primary',
  },
  render: ({ ...args }) => <Button {...args} />,
};

export const ButtonSecondary: Story = {
  args: {
    variant: 'secondary',
    name: 'button-secondary',
    'aria-label': 'button',
    onClick: () => {},
    children: 'Button Secondary',
  },
  render: ({ ...args }) => <Button {...args} />,
};
