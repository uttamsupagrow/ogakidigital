import type { Metadata } from "next";
import { ThemeProvider } from "styled-components";
import StyledComponentsRegistry from "@/lib/registry";
import { GlobalStyle } from "@/styles/GlobalStyle";
import { theme } from "@/styles/theme";
import { reckless, gtAmerica } from "@/lib/localFont";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CookieConsent from "@/components/forms/CookieConsent";
import AnalyticsTracker from "@/components/animation/AnalyticsTracker";
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  defaultOgImage,
} from "@/lib/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "OGAKI is the social-first agency for prestige beauty — organic social, influencer marketing, paid social, creator-led affiliate, and content creation for elevated beauty brands.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description:
      "The social-first agency for prestige beauty. Social, influence, commerce — built to work together.",
    url: SITE_URL,
    images: [{ url: defaultOgImage, width: 1200, height: 630, alt: "OGAKI" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | ${SITE_TAGLINE}`,
    description: "The social-first agency for prestige beauty.",
    images: [defaultOgImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${reckless.variable} ${gtAmerica.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
            <CookieConsent />
            <AnalyticsTracker />
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
