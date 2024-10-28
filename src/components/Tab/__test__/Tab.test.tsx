import { render, screen } from '@testing-library/react';
import { Tab } from '../Tab';
import userEvent from '@testing-library/user-event';

describe('Tab', () => {
  it('should render correctly', () => {
    render(<Tab />);
  });

  it('should show the user the corresponding section', async () => {
    render(<Tab section="/links" />);

    const tabLink = screen.getByRole('link');
    await userEvent.click(tabLink);

    expect();
  });
});
