import { ReactNode } from 'react';
import Image from 'next/image';
import EmailLanding from '@/widgets/EmailSubscription/EmailSubscription.widget';
import { FeatureCard } from '@/components';

export default function SubscribePage(): ReactNode {
  return (
    <main className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <Image
            src={'/logo-devlinks-large.svg'}
            alt="DevLinks Logo"
            width={250}
            height={250}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Ultimate Link Sharing Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create, organize, and share your developer resources with
            ease
          </p>
        </header>

        <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Join the Waitlist
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Be the first to know when we launch and get exclusive
            early access!
          </p>
          <div className="flex justify-center">
            <EmailLanding />
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            title="Organize Your Links"
            description="Create custom collections for different topics or projects"
            icon="📚"
          />
          <FeatureCard
            title="Share with Ease"
            description="Generate shareable links for your collections"
            icon="🔗"
          />
          <FeatureCard
            title="Discover Resources"
            description="Explore curated collections from other developers"
            icon="🔍"
          />
        </section>

        <footer className="text-center text-gray-600">
          <p>&copy; 2024 DevLinks. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
