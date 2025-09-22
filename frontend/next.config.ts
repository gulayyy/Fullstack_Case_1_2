import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5125/api',
    NEXT_PUBLIC_AUTH_STORAGE_KEY: process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY || 'case1_auth_token',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Case 1 Full Stack',
  },
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Image optimization
  images: {
    // SVG data URLs için format belirleme
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
