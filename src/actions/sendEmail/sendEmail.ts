'use server';

import { EmailTemplate } from '../../components/EmailTemplate/EmailTemplate';
import { Resend } from 'resend';

export async function sendEmail(email: string) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'DevLinks <subscription@devlinks.com>',
      to: [email],
      subject: 'Greetings fellow Dev!',
      react: EmailTemplate({ firstName: email }),
      text: 'Email Received!',
    });

    if (error) {
      return error;
    }
    console.log({ data });
    return data;
  } catch (error) {
    return error;
  }
}
