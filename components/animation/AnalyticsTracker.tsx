"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getStoredConsent, trackPageView } from "@/lib/analytics/gtag";

/**
 * Sends a page_view on client-side route changes only. The initial load's PV
 * is emitted by the loader script itself (send_page_view), so skipping the
 * first render here prevents duplicate page-view events.
 */
export default function AnalyticsTracker() {
  const pathname = usePathname();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (getStoredConsent() !== "granted") return;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
