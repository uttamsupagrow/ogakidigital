/**
 * Typed content layer for OGAKI Digital.
 * All copy below was captured from the live reference site
 * (www.ogakidigital.com) during the public audit on 2026-10-13.
 *
 * The Prismic adapter (lib/prismic/adapter.ts) can replace these
 * local sources without touching UI components — see docs/CMS.md.
 */

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  slug: string;
  brand: string;
  title: string;
  disciplines: string; // e.g. "Product Launch + Social Media + Paid Social"
  category: string; // primary discipline label used for filtering
  overview: string;
  stats: CaseStudyStat[];
  challenge: string;
  solutionTitle: string;
  solutionIntro: string;
  solutionBullets: string[];
  results: string[];
  image?: string;
  logo?: string;
  relatedSlugs?: string[];
}

export interface ServicePillar {
  name: string;
  items: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
}

export interface ServicePage {
  slug: string;
  index: number;
  navLabel: string;
  h1: string;
  intro: string;
  heroImage: string;
  bandTitle: string; // "From Creation to Conversion"-style heading
  bandCopy: string[];
  whatWeDo: string; // "(What we do)" one-liner
  pillars: ServicePillar[];
  networkTitle: string;
  networkHtml: string; // rich text captured from the reference page
  approachTitle: string;
  approachHtml: string;
  secondaryImages: string[];
  testimonials: (Testimonial & { avatar?: string })[];
  relatedCaseStudies: string[]; // slugs
  contactCta: string;
}

export interface BlogPost {
  slug: string;
  kind: "Trend Report" | "Opinion";
  title: string;
  date: string; // ISO
  excerpt: string;
  image?: string;
}

export interface Award {
  year: string;
  title: string;
}

export interface NewsItem {
  kind: "News" | "Award";
  title: string;
}

export interface ClientLogo {
  category: string;
  name: string;
  logo: string;
}
