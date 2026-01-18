/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Enable Turbopack (default in Next.js 16)
  turbopack: {},
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // No intentar resolver estos módulos en el cliente
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        'fs/promises': false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig; 