// hooks/useRecaptcha.ts
import { useEffect, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => Promise<void>;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE!;

export const useRecaptcha = () => {
  useEffect(() => {
    // Check if script is already loaded
    if (document.querySelector('#recaptcha-script')) {
      return;
    }

    // Load the reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.id = 'recaptcha-script';

    // Add error handling
    script.onerror = () => {
      console.error('Error loading reCAPTCHA script');
    };

    document.body.appendChild(script);

    return () => {
      // Only remove if it exists and we added it
      const scriptElement = document.querySelector(
        '#recaptcha-script'
      );
      if (scriptElement) {
        document.body.removeChild(scriptElement);
      }
    };
  }, []);

  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      try {
        // Make sure grecaptcha is loaded
        if (!window.grecaptcha) {
          throw new Error('reCAPTCHA not loaded');
        }

        return new Promise((resolve, reject) => {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(
                RECAPTCHA_SITE_KEY,
                { action }
              );
              resolve(token);
            } catch (error) {
              reject(error);
            }
          });
        });
      } catch (error) {
        console.error('reCAPTCHA error:', error);
        throw error;
      }
    },
    []
  );

  return { executeRecaptcha };
};
