/**
 * Site-wide audited constants — captured from the live reference site
 * (www.ogakidigital.com) during the public audit on 2026-10-13.
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_NAME = "OGAKI";
export const SITE_TAGLINE = "The Social-First Beauty Agency";

export const CONTACT_EMAIL = "hello@ogakidigital.com";

export const locations = [
  { city: "NYC" },
  { city: "LA" },
];

export const address = {
  line1: "6 St Johns Ln",
  line2: "New York, NY 10013",
  label: "NYC / LA",
};

export const socials = [
  { label: "Instagram", href: "https://www.instagram.com/ogakidigital/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/ogaki-digital/" },
  { label: "TikTok", href: "https://www.tiktok.com/@ogakidigital" },
];

/** Homepage hero image + supporting imagery (public Prismic CDN, verified URLs). */
export const homeImages = {
  hero: "https://images.prismic.io/ogaki/Zvpqe7VsGrYSwHyI_0819-OGAKI00391.jpg",
  weAreOgaki: "https://images.prismic.io/ogaki/ZvptxbVsGrYSwH0c_0819-OGAKI0132EDIT.jpg",
  servicesBand: "https://images.prismic.io/ogaki/ZvpyibVsGrYSwH39_0819-OGAKI00611EDIT-V2.jpg",
  ogPreview: "https://images.prismic.io/ogaki/Zwm3yYF3NbkBXW6f_OG-WEB-PREVIEW-IMAGE-1024-1-.jpg",
};

export const defaultOgImage = homeImages.ogPreview;

/** Award seals shown on the homepage / expertise award strip. */
export const awardSeals = [
  "https://images.prismic.io/ogaki/aE7LfrNJEFaPX-Iy_ZtXDNUaF0TcGJrWj_NEXT2024FinalistSealBlackTransparentcopy.png",
  "https://images.prismic.io/ogaki/ZrNG6kaF0TcGIvnj_Screenshot2024-08-07at11.05.13.png",
  "https://images.prismic.io/ogaki/Zt66JxoQrfVKl1_Q_ZrNGgEaF0TcGIvnU_business-insider-1-1.png",
  "https://images.prismic.io/ogaki/ZrNGk0aF0TcGIvnV_prnet.png",
];
