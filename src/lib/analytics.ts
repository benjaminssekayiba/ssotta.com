declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

let scriptLoaded = false;

export function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || scriptLoaded) return;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
  scriptLoaded = true;
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: path });
}

export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (!GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", name, params);
}
