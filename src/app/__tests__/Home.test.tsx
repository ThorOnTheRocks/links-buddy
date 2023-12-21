import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home', () => {
  test('Correctly renders Home page and heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
