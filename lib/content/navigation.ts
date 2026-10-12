import type { NavItem } from "./types";

/**
 * Header navigation, exactly as audited on the reference site:
 * About / Services (dropdown) / Expertise / Work (dropdown) / O-word / Contact.
 */
export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Organic Social", href: "/services/social-media-marketing" },
      { label: "Influencer Marketing", href: "/services/influencer-marketing" },
      { label: "Paid Social", href: "/services/paid-social-advertising" },
      { label: "Creator-Led Affiliate", href: "/services/creator-led-affiliate" },
      { label: "Content Creation", href: "/services/social-media-content-creation" },
    ],
  },
  { label: "Expertise", href: "/beauty" },
  {
    label: "Work",
    href: "/agency-case-studies",
    children: [
      { label: "Case Studies", href: "/agency-case-studies" },
      { label: "Creative Portfolio", href: "/creative-portfolio" },
    ],
  },
  { label: "O-word", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Footer sitemap links (audited). */
export const footerNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Expertise", href: "/beauty" },
  { label: "Work", href: "/agency-case-studies" },
  { label: "O-Word", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Mobile menu — services sub-items expanded inline (audited order). */
export const mobileNav: NavItem[] = mainNav;
