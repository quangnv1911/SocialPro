const ENV = {
  GOOGLE_CLIENT_KEY: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_KEY as string,
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN as string,
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL as string,
  API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT as string,
  API_ENDPOINT_SSE: process.env.NEXT_PUBLIC_API_ENDPOINT_SSE as string,
};


export { ENV };
