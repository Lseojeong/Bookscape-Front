export const ENV = {
  API_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? '',
} as const;
if (!ENV.API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_BASE_URL is not defined. Please check your .env file.');
}
