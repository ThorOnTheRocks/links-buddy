import { ReactNode } from 'react';
import Image from 'next/image';
import EmailLanding from '@/widgets/EmailSubscription/EmailSubscription.widget';
import logoImgDevLinks from '../../../public/assets/images/logo-devlinks-large.png';

export default function SubscribePage(): ReactNode {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen flex flex-col items-center justify-center py-12">
      <div className="px-4 text-center">
        <Image
          alt="DevLinks Logo"
          width={200}
          height={200}
          src={logoImgDevLinks}
          className="mx-auto"
        />
        <p className="text-lg mt-3 mb-2">
          The best link sharing platform for engineers, hackers, and
          developers is coming soon...
        </p>
        <p className="text-lg mb-4">
          Get notified with an exclusive gift and discount
          subscription!
        </p>
      </div>
      <EmailLanding />
    </main>
  );
}
