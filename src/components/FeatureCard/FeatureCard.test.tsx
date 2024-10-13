import React from 'react';
import { render, screen } from '@testing-library/react';
import { FeatureCard } from './FeatureCard';

describe('FeatureCard', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
    icon: '🚀',
  };

  it('should render the component with correct props', () => {
    render(<FeatureCard {...mockProps} />);

    // Check if the title is rendered
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    // Check if the description is rendered
    expect(
      screen.getByText(mockProps.description)
    ).toBeInTheDocument();

    // Check if the icon is rendered
    expect(screen.getByText(mockProps.icon)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<FeatureCard {...mockProps} />);

    const container = screen.getByRole('article');
    expect(container).toHaveClass(
      'bg-white',
      'rounded-lg',
      'shadow-md',
      'p-6'
    );

    const title = screen.getByText(mockProps.title);
    expect(title).toHaveClass(
      'text-xl',
      'font-bold',
      'text-gray-800',
      'mb-2'
    );

    const description = screen.getByText(mockProps.description);
    expect(description).toHaveClass('text-gray-600');
  });
});
