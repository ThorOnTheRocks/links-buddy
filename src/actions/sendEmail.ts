'use server';

import { LinksBuddyConfirmationEmail } from '../components/index';
import { Resend } from 'resend';

export async function sendEmail(email: string, firstName: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'LinksBuddy <hello@linksbuddy.org>',
    to: [email],
    subject: `Hello ${firstName}`,
    react: LinksBuddyConfirmationEmail({
      username: firstName,
      logoUrl: '/assets/LinksBuddy Logo High-Res.svg',
    }),
  });
}
