import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      canvas: false,
      encoding: false,
    };
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
  transpilePackages: ['framer-motion'],
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
};

export default withNextIntl(nextConfig);