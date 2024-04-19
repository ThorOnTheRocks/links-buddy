import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

const handleClick = jest.fn();

describe('Button Component', () => {
  test('Renders the button with the primary style', () => {
    render(<Button onClick={handleClick}>Click me!</Button>);
    const button = screen.getByRole('button', { name: 'Click me!' });
    expect(button).toHaveClass('btnPrimary');
  });

  test('Renders the button with the secondary style', () => {
    render(
      <Button variant="secondary" onClick={handleClick}>
        Click me!
      </Button>
    );
    const button = screen.getByRole('button', {
      name: 'Click me!',
    });
    expect(button).toHaveClass('btnSecondary');
  });

  test('Renders the button primary variant as disabled when isDisabled is true', () => {
    render(
      <Button onClick={handleClick} isDisabled>
        Click me!
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Click me!' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btnPrimaryDisabled');
  });

  test('Renders the button secondary variant as disabled when isDisabled is true', () => {
    render(
      <Button onClick={handleClick} variant="secondary" isDisabled>
        Click me!
      </Button>
    );
    const button = screen.getByRole('button', {
      name: 'Click me!',
    });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btnSecondaryDisabled');
  });

  test('Calls onClick prop when clicked', async () => {
    render(<Button onClick={handleClick}>Click me!</Button>);
    const button = screen.getByRole('button', { name: 'Click me!' });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('Applies additional class names passed via className prop', () => {
    const className = 'extra-class';
    render(
      <Button onClick={handleClick} className={className}>
        Click me!
      </Button>
    );
    const button = screen.getByRole('button', { name: 'Click me!' });
    expect(button).toHaveClass('extra-class');
  });
});
