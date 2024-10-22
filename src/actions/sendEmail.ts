'use server';

import { LinksBuddyConfirmationEmail } from '../components/index';
import { Resend } from 'resend';

export async function sendEmail(email: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing Resend API key');
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://linksbuddy.org';
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const logoPath = '/assets/Logo Files/svg/logo-no-background.svg';

    await resend.emails.send({
      from: 'LinksBuddy <hello@linksbuddy.org>',
      to: [email],
      subject: 'Welcome to LinksBuddy',
      react: LinksBuddyConfirmationEmail({
        logoUrl: logoPath,
        baseUrl: baseUrl,
        subscriberCount: '1,000+',
        welcomeMessage:
          'You are officially on the LinksBuddy VIP list!',
        ctaUrl: baseUrl,
        ctaText: 'Check Out Our Coming Soon Page',
        contactEmail: 'hello@linksbuddy.org',
      }),
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}
