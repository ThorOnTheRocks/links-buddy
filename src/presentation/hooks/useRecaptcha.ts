import { useEffect } from 'react';

export const useRecaptcha = (siteKey: string) => {
  useEffect(() => {
    if (!document.querySelector(`#recaptcha-script`)) {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [siteKey]);
};
