import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { LinksBuddyConfirmationEmail } from './EmailTemplate';
import { LinksBuddyConfirmationEmailProps } from './EmailTemplate.types';

export default {
  title: 'Components/LinksBuddyConfirmationEmail',
  component: LinksBuddyConfirmationEmail,
  argTypes: {
    username: { control: 'text' },
    subscriberCount: { control: 'text' },
    welcomeMessage: { control: 'text' },
    ctaText: { control: 'text' },
    ctaUrl: { control: 'text' },
    contactEmail: { control: 'text' },
    benefitPoints: { control: 'array' },
    logoUrl: { control: 'text' },
  },
} as unknown as Meta;

const Template: StoryFn<LinksBuddyConfirmationEmailProps> = (
  args
) => <LinksBuddyConfirmationEmail {...args} />;

export const Default = Template.bind({});
Default.args = {
  logoUrl: '/assets/LinksBuddy-logo-high-res.png',
};

export const CustomizedEmail = Template.bind({});
CustomizedEmail.args = {
  username: 'Jane Smith',
  subscriberCount: '10,000+',
  welcomeMessage: 'Welcome to the LinksBuddy Family!',
  ctaText: 'Explore LinksBuddy Features',
  ctaUrl: 'https://linksbuddy.org/features',
  contactEmail: 'support@linksbuddy.org',
  benefitPoints: [
    'Early access to our beta release',
    '50% discount on our premium plan',
    'Exclusive webinars on link management strategies',
  ],
  socialLinks: {
    twitter: 'https://twitter.com/linksbuddy_app',
    facebook: 'https://facebook.com/linksbuddy_app',
    instagram: 'https://instagram.com/linksbuddy_app',
  },
  logoUrl: '/assets/LinksBuddy-logo-high-res.png',
};
