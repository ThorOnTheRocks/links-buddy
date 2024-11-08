export interface LinksBuddyConfirmationEmailProps {
  username?: string;
  subscriberCount?: string;
  welcomeMessage?: string;
  logoUrl?: string;
  logoAlt?: string;
  ctaUrl?: string;
  ctaText?: string;
  contactEmail?: string;
  benefitPoints?: string[];
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  preferencesUrl?: string;
  footerContent?: React.ReactNode;
  baseUrl?: string;
}
