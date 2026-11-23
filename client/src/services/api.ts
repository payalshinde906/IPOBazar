/**
 * Thin API client for the IPOBazar backend.
 *
 * Screens/hooks must call functions from here instead of calling `fetch`
 * directly. Keeping the network layer in one place makes it easy to add
 * auth headers, error handling and caching (TanStack Query) later.
 *
 * The base URL comes from the public Expo env var EXPO_PUBLIC_API_BASE_URL,
 * falling back to the local backend during development.
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://127.0.0.1:8000';

export interface HealthResponse {
  status: string;
  service: string;
}

/** GET /health — liveness probe used to verify client <-> server connectivity. */
export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error(`API responded with status ${response.status}`);
  }
  return (await response.json()) as HealthResponse;
}
