import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Linting is a separate `npm run lint` step against our own eslint.config.js;
  // Next's bundled lint-on-build runner isn't compatible with our ESLint 8 flat config.
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
