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
            priority
            src={'/assets/LinksBuddy Logo High-Res.svg'}
            alt="links buddy Logo"
            width={800}
            height={800}
            className="mx-auto m-10"
          />
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover, Share, and Organize Links Like Never Before
          </h1>
        </header>

        <section className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Join the LinksBuddy community
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Revolutionize the way you manage your online resources.
            <br></br>
            Share knowledge, curate collections, and connect with
            like-minded individuals.
          </p>
          <div className="flex justify-center">
            <EmailLanding />
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            title="Curate Collections"
            description="Organize your favorite links into public or private collections"
            icon="🔗"
          />
          <FeatureCard
            title="Connect with Others"
            description="Discover new resources and collaborate with the community"
            icon="🍻"
          />
          <FeatureCard
            title="AI-Powered Insights"
            description="Get personalized recommendations and trending topics"
            icon="⚡️"
          />
        </section>

        <footer className="text-center text-gray-600">
          <p>&copy; 2024 LinksBuddy. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
