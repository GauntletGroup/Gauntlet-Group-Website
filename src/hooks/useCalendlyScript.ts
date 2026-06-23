import { useEffect, useState } from 'react';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: {
          name?: string;
          email?: string;
          customAnswers?: Record<string, string>;
        };
      }) => void;
      initPopupWidget?: (options: { url: string }) => void;
    };
  }
}

export function openCalendlyPopup(url: string): void {
  if (window.Calendly) {
    window.Calendly.initPopupWidget?.({ url });
  } else {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

export function useCalendlyScript(): boolean {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.getElementById('calendly-script');
    if (existingScript) {
      if (window.Calendly) setLoaded(true);
      else existingScript.addEventListener('load', () => setLoaded(true));
      return;
    }

    const script = document.createElement('script');
    script.id = 'calendly-script';
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);

  return loaded;
}
