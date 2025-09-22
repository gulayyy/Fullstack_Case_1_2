/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5125/api',
    NEXT_PUBLIC_AUTH_STORAGE_KEY: process.env.NEXT_PUBLIC_AUTH_STORAGE_KEY || 'case1_auth_token',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Case 1 Full Stack',
  },
  images: {
    domains: ['localhost', 'via.placeholder.com'],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:5125'],
    },
    optimizePackageImports: ['lucide-react'],
  },
}

module.exports = nextConfig
