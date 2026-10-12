import type { Award, ClientLogo } from "./types";

/** Homepage / Expertise "Award Winning Work" strip — verbatim from audit. */
export const awards: Award[] = [
  { year: "2026", title: "Best Social Media + Influencer Agency Finalist" },
  { year: "2025", title: "Digital Agency Of The Year" },
  { year: "2024", title: "Best Social Media + Influencer Agency Finalist" },
  { year: "2023", title: "Top 15 Boutique Agencies In The US" },
  { year: "2022", title: "Best Social Media + Influencer Agency" },
  { year: "2021", title: "Top 100 Agencies" },
];

/** Audited award copy exactly as presented on the reference homepage. */
export const awardBands = [
  { headline: "2026, 2025 & 2024", sub: "Best Social Media + Influencer Agency Finalist" },
  { headline: "2025, 2024 & 2023", sub: "Digital Agency Of The Year" },
  { headline: "2023", sub: "Top 15 Boutique Agencies In The US" },
  { headline: "2022", sub: "Best Social Media + Influencer Agency" },
  { headline: "2021", sub: "Top 100 Agencies" },
];

/** About page — "Latest News & Accolades" (verbatim titles from audit). */
export const newsItems = [
  { kind: "News" as const, title: "Founder Renee Ogaki Shares Insights on the Future of Beauty Marketing" },
  { kind: "News" as const, title: "BeautyMatter Names OGAKI One of The Best Agencies Working in Beauty in 2025" },
  { kind: "News" as const, title: "OGAKI Founder Renee Ogaki Featured in Vogue Business On How AI Will Change Beauty Careers" },
  { kind: "News" as const, title: "Launchmetrics Brand Ambassador Marketing 2025 Report featuring insights from Founder Renee Ogaki" },
  { kind: "Award" as const, title: "OGAKI Named Best Digital Agency by PR Net’s NextGen Awards for Third Year in a Row" },
  { kind: "Award" as const, title: "OGAKI Is A Second-Time BeautyMatter NEXT Award Finalist" },
];

/** Expertise page — SELECT CLIENTS grid (verbatim from audit). */
export const clients: ClientLogo[] = [
  { category: "Skincare", name: "Dr. Diamond's Metacine", logo: "" },
  { category: "Makeup", name: "Laura Mercier", logo: "" },
  { category: "Sunscreen", name: "EltaMD", logo: "" },
  { category: "Skincare", name: "U Beauty", logo: "" },
  { category: "Haircare", name: "Moroccanoil", logo: "" },
  { category: "Fragrance", name: "D.S. & Durga", logo: "" },
  { category: "Skincare", name: "Sulwhasoo", logo: "" },
  { category: "Devices", name: "NuFace", logo: "" },
  { category: "Makeup", name: "Bare Minerals", logo: "" },
  { category: "Skincare", name: "Omorovicza", logo: "" },
  { category: "Hair Tools", name: "T3 Micro", logo: "" },
  { category: "Makeup", name: "Jillian Dempsey", logo: "" },
  { category: "Skincare", name: "POV Beauty", logo: "" },
  { category: "Body Care", name: "Luna Daily", logo: "" },
  { category: "Fragrance", name: "Supersuite", logo: "" },
  { category: "Skincare", name: "Lancer Skincare", logo: "" },
  { category: "Haircare", name: "Arey Haircare", logo: "" },
];

/** Expertise page — By The Numbers (verbatim). */
export const expertiseStats = [
  { value: "88%", label: "Client Retention Rate" },
  { value: "100+", label: "Beauty Products Launched" },
  { value: "500+", label: "Influencer Campaigns Executed" },
  { value: "10,000+", label: "Pieces of Social Content Produced" },
];

/** About page — five principles (verbatim). */
export const principles = [
  {
    index: "01",
    title: "A Higher Standard",
    body: "We are results oriented, goal driven, and always raising the bar. We believe in “kaizen” - the art of perfection and continuous improvement.",
  },
  {
    index: "02",
    title: "Beauty at the Core",
    body: "Beauty is not surface. It’s our lens, our language, and the foundation of everything we create.",
  },
  {
    index: "03",
    title: "Always Leading, Never Following",
    body: "We don’t just know what’s happening now. We know what’s coming next. Read our beauty trend reports to learn more.",
  },
  {
    index: "04",
    title: "Relationships Driven",
    body: "From clients to influencers to makeup artists, our long-standing relationships have fostered a network of friends and insiders that makes a difference.",
  },
  {
    index: "05",
    title: "Professional Always",
    body: "Our dedication to professionalism means we are reliable, dependable, and accountable. We believe these are core tenets of strong collaboration.",
  },
];

/** Creative Portfolio categories (verbatim). */
export const portfolioCategories = [
  "Video Creation",
  "Image Creation",
  "Graphic Design",
  "Video Editing",
  "Creator Partnerships",
];
