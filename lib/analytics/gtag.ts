"use client";

/**
 * Consent-aware analytics helpers.
 * IDs come ONLY from environment variables — never hardcode/activate fake IDs.
 *  - NEXT_PUBLIC_GA_MEASUREMENT_ID  (GA4, e.g. G-XXXXXXX)
 *  - NEXT_PUBLIC_GTM_CONTAINER_ID   (GTM, e.g. GTM-XXXXXX)
 *  - NEXT_PUBLIC_LINKEDIN_PARTNER_ID (LinkedIn Insight Tag)
 * GA4 is loaded exclusively through GTM when a container ID exists; otherwise
 * directly when only a GA ID is set — preventing duplicate page views.
 */

export type ConsentState = "granted" | "denied" | "unknown";

const CONSENT_KEY = "ogaki-cookie-consent";

export function getStoredConsent(): ConsentState {
  if (typeof window === "undefined") return "unknown";
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return "unknown";
    const parsed = JSON.parse(raw) as { analytics?: ConsentState };
    return parsed.analytics ?? "unknown";
  } catch {
    return "unknown";
  }
}

export function storeConsent(state: ConsentState) {
  try {
    window.localStorage.setItem(
      CONSENT_KEY,
      JSON.stringify({ analytics: state, ts: Date.now() })
    );
  } catch {
    /* storage unavailable */
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    _linkedin_partner_id?: string;
    lintrk?: boolean;
  }
}

let loaded = false;

export function loadAnalytics() {
  if (loaded || typeof window === "undefined") return;
  if (getStoredConsent() !== "granted") return;

  const gtmId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const liId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;

  if (gtmId) {
    // GTM container — GA4 should be configured inside GTM to avoid double loading.
    window.dataLayer = window.dataLayer || [];
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(s);
    loaded = true;
  } else if (gaId) {
    // Direct GA4 (only when no GTM container is configured).
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
    document.head.appendChild(s);
    window.gtag!("js", new Date());
    window.gtag!("config", gaId, { send_page_view: true });
    loaded = true;
  }

  if (liId) {
    window._linkedin_partner_id = liId;
    window.lintrk = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    document.head.appendChild(s);
  }
}

/** Push a custom event to dataLayer (no-op without consent or loader). */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined" || getStoredConsent() !== "granted") return;
  window.dataLayer = window.dataLayer || [];
  if (window.gtag) {
    window.gtag("event", name, params);
  } else {
    window.dataLayer.push({ event: name, ...params });
  }
}

/** Client-side route-change page view (avoids duplicating Next's initial SSR pv). */
export function trackPageView(path: string) {
  if (typeof window === "undefined" || getStoredConsent() !== "granted") return;
  if (window.gtag) {
    window.gtag("event", "page_view", { page_path: path });
  } else if (process.env.NEXT_PUBLIC_GTM_CONTAINER_ID) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "page_view", page_path: path });
  }
}
