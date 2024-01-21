import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownField } from '../DropdownField';

const onSelect = jest.fn();

describe('DropdownField component', () => {
  test('renders DropdownField with default value and options', () => {
    const dropdownData = ['Option 1', 'Option 2', 'Option 3'];
    const defaultValue = 'Select an option';

    render(
      <DropdownField
        dropdownData={dropdownData}
        defaultValue={defaultValue}
        onSelect={onSelect}
      />
    );

    const placeholderElement = screen.getByText(defaultValue);
    expect(placeholderElement).toBeInTheDocument();

    dropdownData.forEach((option) => {
      expect(screen.queryByText(option)).not.toBeInTheDocument();
    });
  });

  test('Dropdown opens and options are visible when clicked', async () => {
    const dropdownData = ['Option 1', 'Option 2', 'Option 3'];
    render(
      <DropdownField
        dropdownData={dropdownData}
        onSelect={onSelect}
      />
    );

    const toggleButton = screen.getByRole('button');
    await userEvent.click(toggleButton);

    dropdownData.forEach((option) => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test('Dropdown calls onSelect with the correct value when an item is selected', async () => {
    const dropdownData = ['Option 1', 'Option 2', 'Option 3'];

    render(
      <DropdownField
        dropdownData={dropdownData}
        onSelect={onSelect}
      />
    );

    const toggleButton = screen.getByRole('button');
    await userEvent.click(toggleButton);

    const optionToSelect = dropdownData[1];
    const optionElement = screen.getByText(optionToSelect);
    await userEvent.click(optionElement);

    expect(onSelect).toHaveBeenCalledWith(optionToSelect);
  });
});
