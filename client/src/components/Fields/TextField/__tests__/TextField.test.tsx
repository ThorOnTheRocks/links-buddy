import React from 'react';
import '@testing-library/jest-dom';
import { TextField } from '../TextField';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('TextField component', () => {
  test('renders TextField with label', () => {
    render(
      <TextField
        type="text"
        name="name"
        value="Test Value"
        htmlFor="testField"
        label="Test Label"
        onChange={() => {}}
      />
    );

    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toBeInTheDocument();

    const inputElement = screen.getByLabelText(
      'Test Label'
    ) as HTMLInputElement;
    expect(inputElement.value).toBe('Test Value');
  });

  test('The onChnage method is called correctly', async () => {
    const onChange = jest.fn();
    render(
      <TextField
        type="text"
        name="name"
        value="Test Value"
        htmlFor="testField"
        label="Test Label"
        onChange={onChange}
      />
    );

    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'Hello world!');

    expect(onChange).toHaveBeenCalled();
  });
  test('Test when user inser an invalid value and the TextField component renders as error', async () => {
    const onChange = jest.fn();

    render(
      <TextField
        type="text"
        isError={true}
        name="name"
        value="Test Value"
        htmlFor="testField"
        label="Test Label"
        onChange={onChange}
      />
    );

    const inputElement = screen.getByRole(
      'textbox'
    ) as HTMLInputElement;
    await userEvent.type(inputElement, 'Hello world!');

    expect(onChange).toHaveBeenCalled();

    expect(inputElement).toHaveClass('textFieldError');
  });
});
