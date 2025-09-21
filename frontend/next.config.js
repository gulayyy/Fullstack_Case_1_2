const withNextIntl = require('next-intl/plugin')(
  // This is the default location for the i18n config
  './src/i18n.ts'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'via.placeholder.com'],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:5125'],
    },
  },
}

module.exports = withNextIntl(nextConfig)
