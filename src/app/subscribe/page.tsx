import { ReactNode } from 'react';
import Image from 'next/image';
import EmailLanding from '@/widgets/EmailSubscription/EmailSubscription.widget';
import logoImgDevLinks from '../../../public/assets/images/logo-devlinks-large.png';

export default function Home(): ReactNode {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center justify-center">
      <div className="mb-6">
        <h1>
          <Image
            alt="DevLinks Logo"
            width={200}
            height={200}
            src={logoImgDevLinks}
            className="mx-auto"
          />
        </h1>
      </div>
      <p className="text-lg mb-4">
        The best link sharing platform for engineers, hackers, and
        developers is coming soon...
      </p>
      <p className="text-lg">
        Get notified with an exclusive gift and discount subscription!
      </p>
      <EmailLanding />
    </main>
  );
}
