import { useEffect, useState } from 'react';

export function useCalendlyScript() {
  const [loaded, setLoaded] = useState(() => typeof window !== 'undefined' && !!window.Calendly);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // If Calendly is already loaded globally, mark as loaded
    if (window.Calendly) {
      setLoaded(true);
      return;
    }

    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]') as HTMLScriptElement | null;
    
    const handleLoad = () => setLoaded(true);
    const handleError = () => console.error('Calendly SDK failed to load');

    if (existingScript) {
      // If the script tag exists but window.Calendly is not defined yet, wait for the load event
      existingScript.addEventListener('load', handleLoad);
      existingScript.addEventListener('error', handleError);
      return () => {
        existingScript.removeEventListener('load', handleLoad);
        existingScript.removeEventListener('error', handleError);
      };
    }

    // Load Calendly CSS for popup modal styling
    const existingLink = document.querySelector('link[href="https://assets.calendly.com/assets/external/widget.css"]');
    if (!existingLink) {
      const link = document.createElement('link');
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }

    // Load Calendly JavaScript Widget SDK
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.addEventListener('load', handleLoad);
    script.addEventListener('error', handleError);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', handleLoad);
      script.removeEventListener('error', handleError);
    };
  }, []);

  return loaded;
}

interface PopupPrefill {
  name?: string;
  email?: string;
  company?: string;
  contactNumber?: string;
}

/**
 * Triggers the Calendly Popup modal programmatically with custom styling & prefill
 */
export function openCalendlyPopup(url: string, prefill?: PopupPrefill) {
  if (typeof window === 'undefined' || !window.Calendly) {
    // If not loaded, fallback to redirecting in a new tab
    const fallbackUrl = new URL(url);
    if (prefill) {
      if (prefill.name) fallbackUrl.searchParams.append('name', prefill.name);
      if (prefill.email) fallbackUrl.searchParams.append('email', prefill.email);
    }
    window.open(fallbackUrl.toString(), '_blank', 'noopener,noreferrer');
    return;
  }

  const queryParams = new URLSearchParams({
    background_color: '0b1120', // Matches deep dark cardbg
    text_color: 'ffffff',       // Matches white text
    primary_color: 'f59e0b',    // Matches premium amber gold accent
    hide_landing_page_details: '1',
    hide_gdpr_banner: '1',
  });

  if (prefill) {
    if (prefill.name) queryParams.append('name', prefill.name);
    if (prefill.email) queryParams.append('email', prefill.email);
    if (prefill.company) queryParams.append('a1', prefill.company); // Maps to Custom Question 1
    if (prefill.contactNumber) queryParams.append('a2', prefill.contactNumber); // Maps to Custom Question 2
  }

  const urlWithParams = `${url}?${queryParams.toString()}`;
  window.Calendly.showPopupWidget(urlWithParams);
}
