import type { Metadata } from 'next';
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
      <link rel="icon" sizes="32x32" href="/favicon.ico" />
      <body>{children}</body>
    </html>
  );
}
