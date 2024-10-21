import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { LinksBuddyConfirmationEmailProps } from './EmailTemplate.types';
import styles from './email-template.module.css';

export const EmailContent: React.FC<
  LinksBuddyConfirmationEmailProps
> = ({
  username = 'Valued Subscriber',
  subscriberCount = '1,000+',
  welcomeMessage = 'You are officially on the LinksBuddy VIP list!',
  logoUrl,
  logoAlt = 'LinksBuddy Logo',
  ctaUrl = 'https://linksbuddy.org/coming-soon',
  ctaText = 'Check Out Our Coming Soon Page',
  contactEmail = 'hello@linksbuddy.org',
  benefitPoints = [
    'You will be among the first to know when LinksBuddy launches',
    'Exclusive early access to our platform before the general public',
    'Special launch offers reserved only for our subscribers',
  ],
  socialLinks = {
    twitter: 'https://twitter.com/linksbuddy',
    facebook: 'https://facebook.com/linksbuddy',
    instagram: 'https://instagram.com/linksbuddy',
  },
  preferencesUrl = 'https://linksbuddy.org',
  footerContent,
  baseUrl,
}) => {
  const fullLogoUrl = logoUrl
    ? `${baseUrl}${logoUrl}`
    : `${baseUrl}/assets/LinksBuddy-logo-high-res.png`;

  return (
    <Body className={styles.emailBody}>
      <Container className={styles.container}>
        <Img
          src={fullLogoUrl}
          width="150"
          height="50"
          alt={logoAlt}
          className={styles.logo}
        />
        <Heading className={styles.heading}>{welcomeMessage}</Heading>
        <Text className={styles.text}>Dear {username},</Text>
        <Text className={styles.text}>
          Fantastic news! You have successfully subscribed to
          LinksBuddy&apos;s exclusive launch list. We are thrilled to
          have you join our community of over {subscriberCount} eager
          early adopters.
        </Text>
        <Text className={styles.text}>
          Here is what this means for you:
        </Text>
        <Section className={styles.bulletPoints}>
          {benefitPoints.map((point, index) => (
            <Text key={index} className={styles.text}>
              • {point}
            </Text>
          ))}
        </Section>
        <Text className={styles.text}>
          We are working hard to bring you a game-changing link
          management experience. Your early support means the world to
          us, and we cannot wait to show you what we have been
          building.
        </Text>
        <Section className={styles.ctaContainer}>
          <Link href={ctaUrl} className={styles.button}>
            {ctaText}
          </Link>
        </Section>
        <Text className={styles.text}>
          To ensure you do not miss our launch announcement, please
          add {contactEmail} to your contacts.
        </Text>
        <Text className={styles.text}>
          Got any questions or suggestions? We would love to hear from
          you! Feel free to reply to this email or reach out to us on
          social media.
        </Text>
        <Text className={styles.text}>
          Stay tuned for some exciting updates!
        </Text>
        <Text className={styles.text}>
          Best regards,
          <br />
          The LinksBuddy Team
        </Text>
        <Section className={styles.footer}>
          {footerContent || (
            <>
              <Text className={styles.footerText}>
                Connect with us:
              </Text>
              {socialLinks.twitter && (
                <Link
                  href={socialLinks.twitter}
                  className={styles.socialLink}
                >
                  Twitter
                </Link>
              )}
              {socialLinks.facebook && (
                <Link
                  href={socialLinks.facebook}
                  className={styles.socialLink}
                >
                  Facebook
                </Link>
              )}
              {socialLinks.instagram && (
                <Link
                  href={socialLinks.instagram}
                  className={styles.socialLink}
                >
                  Instagram
                </Link>
              )}
              <Text className={styles.footerText}>
                <Link
                  href={preferencesUrl}
                  className={styles.socialLink}
                >
                  Manage your email preferences
                </Link>
              </Text>
            </>
          )}
        </Section>
      </Container>
    </Body>
  );
};

export const LinksBuddyConfirmationEmail: React.FC<
  LinksBuddyConfirmationEmailProps
> = (props) => {
  if (typeof window === 'undefined') {
    // Server-side rendering (for email clients)
    return (
      <Html>
        <Head />
        <Preview>
          Welcome to LinksBuddy - You are in for early access!
        </Preview>
        <EmailContent {...props} />
      </Html>
    );
  }

  // Client-side rendering (for Storybook)
  return <EmailContent {...props} />;
};
