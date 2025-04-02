import { fileURLToPath } from 'node:url';
import type { NextConfig } from 'next';
import { createJiti, Jiti } from 'jiti';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const jiti: Jiti = createJiti(fileURLToPath(import.meta.url));

jiti.esmResolve('./src/config/env.ts');

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = {
  metadata: {
    title: 'Social Pro',
    description: 'The best place for social media growth services',
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'debug'] } : false,
  },
  devIndicators: {
    appIsrStatus: false,
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    cssChunking: true,
    optimizePackageImports: [],
    reactCompiler: process.env.NODE_ENV === 'production',
    serverActions: {
      allowedOrigins: process.env.CORS_ORIGINS?.split(','),
    },
    webVitalsAttribution: ['FCP', 'TTFB'],
    useLightningcss: false,
    webpackMemoryOptimizations: true,
  },
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: process.env.NODE_ENV === 'production' ? 60 : 0,
    localPatterns: [
      {
        pathname: '@/assets/images/**',
        search: '',
      },
    ],
    remotePatterns:
      // process.env.CORS_RESOURCE?.split(',').map((remote) => ({
      //   hostname: remote,
      // })) ?? [],
      [
        {
          protocol: 'https',
          hostname: '**', // Chấp nhận tất cả hostname
        },
      ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  output: 'standalone',
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Tắt ESLint trong quá trình build
  },
  serverExternalPackages: ['pino-pretty'],
};

export default withBundleAnalyzer(nextConfig);
