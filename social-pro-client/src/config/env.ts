const ENV = {
  GOOGLE_CLIENT_KEY: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY as string,
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN as string,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL as string,
};


export { ENV };
