import { ReactNode } from 'react';
import Image from 'next/image';
import EmailLanding from '@/widgets/EmailLanding/EmailLanding';
import logoImgDevLinks from '../../public/assets/images/logo-devlinks-large.png';

export default function Home(): ReactNode {
  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="m-5">
          <Image
            alt="logo dev links landing"
            width={300}
            height={300}
            src={logoImgDevLinks}
          />
        </div>
        <div className="text-center">
          <p className="text-lg">
            The best Link sharing platform for
            engineers/hackers/developer is coming soon...
          </p>
          <p className="text-lg">
            If you want to be noticed, with an extra gift and discount
            subscription, leave your email
          </p>
        </div>
        <EmailLanding />
      </div>
    </main>
  );
}
