import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.STATIC_EXPORT ? 'export' : 'standalone',
  basePath: process.env.STATIC_EXPORT ? '/vaibhavam' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
