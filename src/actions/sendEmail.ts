'use server';

import { EmailTemplate } from '../components/EmailTemplate/EmailTemplate';
import { Resend } from 'resend';

export async function sendEmail(email: string, firstName: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['gianluca.galota@gmail.com'],
    subject: `Hello ${firstName}`,
    react: EmailTemplate({ firstName }),
    text: 'Congrats for subscribing to DevLinks!',
  });

  console.log(data);
  console.log(error);
}
