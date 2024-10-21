import React from 'react';
import { render, screen } from '@testing-library/react';
import { LinksBuddyConfirmationEmail } from '../EmailTemplate';

jest.mock('@react-email/components', () => ({
  Body: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="body">{children}</div>
  ),
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
  Head: () => <div data-testid="head">Head</div>,
  Heading: ({ children }: { children: React.ReactNode }) => (
    <h1 data-testid="heading">{children}</h1>
  ),
  Html: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="html">{children}</div>
  ),
  Img: ({ alt, src }: { alt: string; src: string }) => (
    <img data-testid="img" alt={alt} src={src} />
  ),
  Link: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a data-testid="link" href={href}>
      {children}
    </a>
  ),
  Preview: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="preview">{children}</div>
  ),
  Section: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="section">{children}</div>
  ),
  Text: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="text">{children}</p>
  ),
}));

describe('LinksBuddyConfirmationEmail', () => {
  it('renders with default props', () => {
    render(<LinksBuddyConfirmationEmail />);

    expect(screen.getByTestId('heading')).toHaveTextContent(
      'You are officially on the LinksBuddy VIP list!'
    );
    expect(
      screen.getByText(/Dear Valued Subscriber/)
    ).toBeInTheDocument();
    expect(screen.getByText(/1,000\+/)).toBeInTheDocument();
    expect(
      screen.getByAltText('LinksBuddy Logo')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Check Out Our Coming Soon Page')
    ).toBeInTheDocument();

    // Check default benefit points
    expect(
      screen.getByText(
        /You will be among the first to know when LinksBuddy launches/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Exclusive early access to our platform before the general public/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Special launch offers reserved only for our subscribers/
      )
    ).toBeInTheDocument();

    // Check default social links
    expect(screen.getByText('Twitter')).toHaveAttribute(
      'href',
      'https://twitter.com/linksbuddy'
    );
    expect(screen.getByText('Facebook')).toHaveAttribute(
      'href',
      'https://facebook.com/linksbuddy'
    );
    expect(screen.getByText('Instagram')).toHaveAttribute(
      'href',
      'https://instagram.com/linksbuddy'
    );
  });

  it('renders with custom props', () => {
    const customProps = {
      username: 'John Doe',
      subscriberCount: '5,000+',
      welcomeMessage: 'Welcome to the LinksBuddy Family!',
      logoUrl: 'https://example.com/custom-logo.png',
      logoAlt: 'Custom Logo',
      ctaText: 'Explore Features',
      ctaUrl: 'https://linksbuddy.org/features',
      contactEmail: 'support@linksbuddy.org',
      benefitPoints: ['Custom benefit 1', 'Custom benefit 2'],
      socialLinks: {
        twitter: 'https://twitter.com/customhandle',
        facebook: 'https://facebook.com/customhandle',
      },
      preferencesUrl: 'https://linksbuddy.com/custom-preferences',
    };

    render(<LinksBuddyConfirmationEmail {...customProps} />);

    expect(screen.getByTestId('heading')).toHaveTextContent(
      'Welcome to the LinksBuddy Family!'
    );
    expect(screen.getByText(/Dear John Doe/)).toBeInTheDocument();
    expect(screen.getByText(/5,000\+/)).toBeInTheDocument();
    expect(screen.getByText('Explore Features')).toHaveAttribute(
      'href',
      'https://linksbuddy.org/features'
    );

    expect(screen.getByText('Twitter')).toHaveAttribute(
      'href',
      'https://twitter.com/customhandle'
    );
    expect(screen.getByText('Facebook')).toHaveAttribute(
      'href',
      'https://facebook.com/customhandle'
    );
    expect(screen.queryByText('Instagram')).not.toBeInTheDocument(); // Instagram link should not be present

    expect(
      screen.getByText('Manage your email preferences')
    ).toHaveAttribute(
      'href',
      'https://linksbuddy.com/custom-preferences'
    );
  });

  it('renders with custom footer content', () => {
    const customFooter = (
      <div data-testid="custom-footer">Custom Footer Content</div>
    );
    render(
      <LinksBuddyConfirmationEmail footerContent={customFooter} />
    );

    expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    expect(screen.getByTestId('custom-footer')).toHaveTextContent(
      'Custom Footer Content'
    );
    expect(
      screen.queryByText('Connect with us:')
    ).not.toBeInTheDocument();
  });
});
