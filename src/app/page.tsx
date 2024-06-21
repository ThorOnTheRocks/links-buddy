import { ReactNode } from 'react';
import Image from 'next/image';
import EmailLanding from '@/widgets/EmailSubscription/EmailSubscription.widget';
import logoImgDevLinks from '../../public/assets/images/logo-devlinks-large.png';

export default function Home(): ReactNode {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center justify-center">
      <div className="mb-6">
        <h1>DevLinks</h1>
      </div>
    </main>
  );
}
