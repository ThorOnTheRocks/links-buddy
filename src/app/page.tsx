import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'LinksBuddy - Smart Link Management',
  description:
    'Discover a smarter way to manage your links. Powered by AI, designed for simplicity, built for professionals.',
};

export default function Home() {
  redirect('/subscribe');
}
