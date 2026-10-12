/**
 * OGAKI design tokens — extracted from the live reference site audit
 * (www.ogakidigital.com, audited 2026-10-13).
 *
 * Colors found in production CSS: #F2EDEB (page bg), #221F20 (ink),
 * #030303 (near-black sections), #e8e4e1 (subtle border/tint).
 * Typography: serif display = "Reckless" (weights 300/400),
 * sans UI/body = "GT America" (weights 400/500/700).
 */

export const colors = {
  paper: "#F2EDEB", // warm bone background
  ink: "#221F20", // primary text / dark surfaces
  black: "#030303", // deep black sections
  tint: "#e8e4e1", // subtle borders / hovers
  white: "#FFFFFF",
  error: "#9E2B25",
} as const;

export type ColorName = keyof typeof colors;

export const fonts = {
  serif: "'Reckless', 'Reckless Fallback', Georgia, serif",
  sans: "'GT America', 'GTAmerica Fallback', Helvetica, Arial, sans-serif",
} as const;

/** Fluid clamp() helpers — mobile-first editorial scale matching reference */
export const pxToRem = (px: number) => `${px / 10}rem`;

export const clamp = (minVwPx: number, maxVwPx: number, minPx: number, maxPx: number) =>
  `clamp(${minPx / 10}rem, ${(minVwPx / 14.4) * 10}vw + 0rem, ${maxPx / 10}rem)`;

export const typography = {
  /** Big hero statement (serif italic-ish light) */
  heroXL: `clamp(4.2rem, 7.4vw, 9.6rem)`,
  heroL: `clamp(3.6rem, 5.6vw, 7.2rem)`,
  sectionH1: `clamp(3.4rem, 5.2vw, 6.4rem)`,
  sectionH2: `clamp(2.8rem, 4vw, 4.8rem)`,
  cardTitle: `clamp(2.2rem, 2.8vw, 3.2rem)`,
  bodyLead: `clamp(1.7rem, 1.9vw, 2.1rem)`,
  body: `1.8rem`,
  small: `1.4rem`,
  micro: `1.1rem`,
  label: `1.2rem`,
} as const;

export const layout = {
  maxWidth: "144rem",
  gutter: "clamp(2rem, 4vw, 6.4rem)",
  headerHeight: "7.2rem",
  radius: "1.2rem",
  breakpoint: {
    desktopL: "1440px",
    desktop: "1280px",
    tabletL: "1024px",
    tablet: "768px",
    mobileL: "560px",
    mobile: "390px",
  },
} as const;

/** Media query helpers for styled-components: mq.tablet`...` */
const bp = layout.breakpoint;
export const mq = {
  desktopL: `@media (max-width: ${bp.desktopL})`,
  desktop: `@media (max-width: ${bp.desktop})`,
  tabletL: `@media (max-width: ${bp.tabletL})`,
  tablet: `@media (max-width: ${bp.tablet})`,
  mobileL: `@media (max-width: ${bp.mobileL})`,
  mobile: `@media (max-width: ${bp.mobile})`,
} as const;

export const theme = {
  colors,
  fonts,
  typography,
  layout,
  mq,
} as const;

export type Theme = typeof theme;
