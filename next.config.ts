import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // INFO: Next.js Image 외부 도메인 허용 설정
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  turbopack: {
    // INFO: Turbopack 설정
    rules: {
      '*.svg': [
        {
          condition: {
            query: 'url',
          },
          type: 'asset',
        },
        {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      ],
    },
  },

  //INFO: Webpack 설정
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: { test?: { test?: (value: string) => boolean } }) => rule.test?.test?.('.svg')
    );

    if (fileLoaderRule) {
      config.module.rules.push({
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      });

      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: { not: [/url/] },
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
