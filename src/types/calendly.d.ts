interface CalendlyPageSettings {
  backgroundColor?: string;
  textColor?: string;
  primaryColor?: string;
  hideLandingPageDetails?: boolean;
  hideGdprBanner?: boolean;
}

interface CalendlyPrefill {
  name?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  customAnswers?: Record<string, string>;
}

interface CalendlyUtm {
  utmCampaign?: string;
  utmSource?: string;
  utmMedium?: string;
  utmContent?: string;
  utmTerm?: string;
}

interface CalendlyInlineWidgetOptions {
  url: string;
  parentElement: HTMLElement | null;
  prefill?: CalendlyPrefill;
  pageSettings?: CalendlyPageSettings;
  utm?: CalendlyUtm;
}

interface Calendly {
  initInlineWidget(options: CalendlyInlineWidgetOptions): void;
  showPopupWidget(url: string): void;
  closePopupWidget(): void;
}

interface Window {
  Calendly?: Calendly;
}