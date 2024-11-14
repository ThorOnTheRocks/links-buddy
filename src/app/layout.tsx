import type { Metadata } from 'next';
import { instrumentSans } from '../styles/fonts/fonts';
import '../styles/globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'LinksBuddy',
  description: 'Supercharge your links collections',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={instrumentSans.className}>
      <link rel="icon" sizes="32x32" href="/favicon.ico" />
      <body>
        {' '}
        <Script
          strategy="beforeInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        />
        {children}
      </body>
    </html>
  );
}
