import type { Metadata } from 'next';
import { instrumentSans } from '../fonts/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevLinks',
  description: 'Link sharing app for developers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={instrumentSans.className}>
      <body>{children}</body>
    </html>
  );
}
