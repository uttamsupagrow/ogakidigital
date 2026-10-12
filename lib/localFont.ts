import localFont from "next/font/local";

/**
 * Font stacks reconstructed to match the reference site's production
 * @font-face declarations (Reckless serif display + GT America sans).
 * These are the site's own distributed woff2 subsets served from its
 * public static asset directory; replace with licensed originals in
 * /public/fonts when final brand licenses are confirmed.
 */
export const reckless = localFont({
  src: [
    { path: "../public/fonts/944fec3f19b05ad3.woff2", weight: "300", style: "normal" },
    { path: "../public/fonts/6a3a6b9b6ed5d1fb.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-reckless",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const gtAmerica = localFont({
  src: [
    { path: "../public/fonts/d2f736b85ce1753d.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/3582f3c0309ef02d.woff2", weight: "500", style: "normal" },
    { path: "../public/fonts/f1c33117647e1241.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-gt-america",
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
