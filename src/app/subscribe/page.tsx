import { ReactNode } from 'react';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Link,
  BarChart2,
  Shield,
  Zap,
  Globe,
  Rocket,
} from 'lucide-react';
import EmailLanding from '@/presentation/widgets/EmailSubscription/EmailSubscription.widget';
import styles from './subscribe-page.module.css';

export const metadata: Metadata = {
  title: 'LinksBuddy - Smart Link Management',
  description:
    'Discover a smarter way to manage your links. Powered by AI, designed for simplicity, built for professionals.',
};

export default function LandingPage(): ReactNode {
  return (
    <main className={styles.page} role="main">
      {/* Hero Section */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <Image
              priority
              src="/assets/Logo Files/svg/logo-no-background.svg"
              alt="LinksBuddy Logo"
              width={800}
              height={800}
              className={styles.logo}
              aria-hidden="true"
            />

            <h1 id="hero-title" className={styles.heroTitle}>
              Link Management
              {/* Using CSS grid or flexbox for visual separation is better than <span> */}
              <span
                className={styles.heroHighlight}
                aria-label="Reimagined"
              >
                Reimagined
              </span>
            </h1>

            <p className={styles.heroText}>
              Discover a smarter way to manage your links. Powered by
              AI, designed for simplicity, built for professionals.
            </p>

            <div
              className={styles.heroForm}
              role="form"
              aria-label="Email subscription form"
            >
              <EmailLanding />
              <p className={styles.formHint} aria-live="polite">
                <Rocket
                  className={styles.Rocket}
                  aria-hidden="true"
                />
                Join now and get premium features for free
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={styles.features}
        aria-labelledby="features-title"
      >
        <div className={styles.container}>
          <h2 id="features-title" className={styles.sectionTitle}>
            Everything you need for professional link management
          </h2>

          <div className={styles.featureGrid} role="list">
            {features.map((feature, index) => (
              <div
                key={index}
                className={styles.featureCard}
                role="listitem"
              >
                <div
                  className={styles.featureIcon}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>
                  {feature.title}
                </h3>
                <p className={styles.featureText}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section
        className={styles.aiSection}
        aria-labelledby="ai-features-title"
      >
        <div className={styles.container}>
          <div className={styles.aiGrid}>
            <div className={styles.aiContent}>
              <h2
                id="ai-features-title"
                className={styles.sectionTitle}
              >
                AI-Powered Link Management
              </h2>
              <p className={styles.aiDescription}>
                Experience the future of link management with our
                AI-powered features. Automatically categorize,
                analyze, and optimize your links for maximum impact.
              </p>
              <ul
                className={styles.aiFeatureList}
                aria-label="AI Features"
              >
                {aiFeatures.map((feature, index) => (
                  <li key={index} className={styles.aiFeatureItem}>
                    <span
                      className={styles.checkIcon}
                      aria-hidden="true"
                    >
                      <Rocket />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.aiVisual}>
              <Image
                className={styles.aiIllustration}
                alt="Visual representation of AI-powered features"
                src="/assets/ai-features.png"
                width={800}
                height={800}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                priority={false}
                quality={75}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 id="cta-title" className={styles.ctaTitle}>
              Ready to Transform Your Link Management?
            </h2>
            <p className={styles.ctaText}>
              Join thousands of professionals managing their links
              smarter with LinksBuddy.
            </p>
            <EmailLanding />
          </div>
        </div>
      </section>

      <footer className={styles.footer} role="contentinfo">
        <div className={styles.container}>
          <p>&copy; 2024 LinksBuddy. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    title: 'Smart Organization',
    description:
      'AI-powered categorization and tagging for effortless link management.',
    icon: <Link aria-hidden="true" />,
  },
  {
    title: 'Advanced Analytics',
    description:
      'Deep insights into your link performance with real-time tracking.',
    icon: <BarChart2 aria-hidden="true" />,
  },
  {
    title: 'Enhanced Security',
    description:
      'Enterprise-grade security features to protect your links and data.',
    icon: <Shield aria-hidden="true" />,
  },
  {
    title: 'Lightning Fast',
    description:
      'Optimized for speed with instant redirects and quick management.',
    icon: <Zap aria-hidden="true" />,
  },
  {
    title: 'Custom Domains',
    description:
      'Use your own domain for branded, professional short links.',
    icon: <Globe aria-hidden="true" />,
  },
  {
    title: 'AI Insights',
    description:
      'Smart recommendations and automated optimizations for your links.',
    icon: <Rocket aria-hidden="true" />,
  },
];

const aiFeatures = [
  'Smart link categorization and tagging',
  'Automated content summarization',
  'Intelligent traffic analysis',
  'SEO optimization suggestions',
  'Predictive analytics',
  'Content safety verification',
];
