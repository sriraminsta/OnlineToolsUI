/**
 * Default matches the public JSONPlaceholder demo API (CORS-enabled).
 * Override with `VITE_API_BASE_URL` in `.env` (no trailing slash).
 */
export function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? 'https://jsonplaceholder.typicode.com'
}
