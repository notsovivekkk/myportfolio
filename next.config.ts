import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Shareable deep links into a company page. The browser keeps the
     #fragment across the redirect and lands on that section. Not
     permanent, so the target can change without browsers caching it. */
  async redirects() {
    return [
      {
        source: "/viralnetix/contribution",
        destination: "/viralnetix#contribution",
        permanent: false,
      },
    ];
  },
  images: {
    /* Loom's own thumbnail CDN. Needed so next/image can serve the
       video posters used by the click to play facade on /viralnetix,
       which it re-encodes to AVIF/WebP and drops from ~90KB to ~20KB. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.loom.com",
        pathname: "/sessions/thumbnails/**",
      },
    ],
  },
};

export default nextConfig;
