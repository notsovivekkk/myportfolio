import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
