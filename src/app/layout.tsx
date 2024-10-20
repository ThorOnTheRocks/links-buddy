import type { Metadata } from 'next';
import Head from 'next/head';
import { instrumentSans } from '../fonts/fonts';
import './globals.css';

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
      <Head>
        <link rel="icon" sizes="32x32" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
