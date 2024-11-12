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

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();

    expect(
      screen.getByText(mockProps.description)
    ).toBeInTheDocument();

    expect(screen.getByText(mockProps.icon)).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    render(<FeatureCard {...mockProps} />);

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
