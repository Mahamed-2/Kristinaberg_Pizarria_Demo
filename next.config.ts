import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: ['localhost', '127.0.0.1']
  }
};

export default withNextIntl(nextConfig);
