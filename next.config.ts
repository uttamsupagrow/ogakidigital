import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // styled-components: enables SSR-compatible class name generation
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.prismic.io",
      },
      {
        protocol: "https",
        hostname: "ogaki.cdn.prismic.io",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  },
};

export default nextConfig;
