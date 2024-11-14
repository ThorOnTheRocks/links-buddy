import React, { ChangeEvent, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LinkIcon } from '@heroicons/react/16/solid';
import { TextField } from './TextField';
import { ITextFieldProps } from './TextField.types';

const meta: Meta<typeof TextField> = {
  title: 'Fields/TextField',
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

const TextFieldWithHooks = ({
  type,
  name,
  value,
  onChange,
  ...props
}: ITextFieldProps) => {
  const [text, setText] = useState('');

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  return (
    <TextField
      value={text}
      onChange={handleChangeInput}
      type={type}
      name={name}
      {...props}
    />
  );
};

export const TextFieldEmpty: Story = {
  args: {
    placeholder: 'Text Field Empty',
    name: 'empty',
    onChange: (e: ChangeEvent<HTMLInputElement>) => e.target.value,
    label: 'Empty TextField:',
  },
  render: ({ ...args }) => <TextFieldWithHooks {...args} />,
};

export const TextFieldErrorState: Story = {
  args: {
    placeholder: 'Error Value',
    name: 'error',
    isError: true,
    label: 'Error TextField:',
    icon: <LinkIcon />,
  },
  render: ({ ...args }) => <TextFieldWithHooks {...args} />,
};

export const TextFieldWithIcon: Story = {
  args: {
    placeholder: 'Text Field With Icon',
    name: 'icon',
    onChange: (e: ChangeEvent<HTMLInputElement>) => e.target.value,
    label: 'TextField with Icon:',
    icon: <LinkIcon />,
  },
  render: ({ ...args }) => <TextFieldWithHooks {...args} />,
};
