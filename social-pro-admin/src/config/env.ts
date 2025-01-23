const ENV = {
  GOOGLE_CLIENT_KEY: import.meta.env.PUBLIC_ENV__META__GOOGLE_CLIENT_KEY as string,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN as string,
  BASE_URL: import.meta.env.VITE_API_URL as string,
};

export { ENV };
