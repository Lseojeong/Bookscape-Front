import * as Sentry from '@sentry/nextjs';

const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV ?? process.env.VERCEL_ENV;
const isVercelProd = vercelEnv === 'production';
const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const tracesSampleRate = 0.1;

Sentry.init({
  dsn,
  enabled: isVercelProd && Boolean(dsn),
  environment: vercelEnv,

  tracesSampleRate,
  enableLogs: true,

  sendDefaultPii: false,
  debug: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
