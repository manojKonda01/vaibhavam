import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/vaibhavam',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
