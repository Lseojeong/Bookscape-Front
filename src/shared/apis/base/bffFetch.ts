import { ApiError } from '@/shared/apis/apiError';
import {
  coreFetch,
  FetchRequestOptions,
  QueryParams,
  buildQueryString,
  RequestConfig,
} from '@/shared/apis/base/coreFetch';

const BFF_BASE_URL = '/api';

/**
 * BFF(Backend For Frontend) 호출 전용 Fetch 함수
 * Next.js API Route(BFF)로 요청을 보냅니다.
 * 별도의 도메인 없이 상대 경로를 사용합니다.
 * 인증 정보(쿠키)는 브라우저에 의해 자동으로 요청 헤더에 포함됩니다.
 *
 * @example
 * ```ts
 * // GET 요청
 * const user = await bffFetch.get<User>('/api/users', { id: userId });
 *
 * // POST 요청
 * const result = await bffFetch.post<{ id: string }>('/api/posts', newPost);
 * ```
 */

const isAuthEndpoint = (endpoint: string) =>
  endpoint.startsWith('/auth') || endpoint.startsWith('/oauth');

type RefreshAuthTokensResponse = {
  success: boolean;
  accessTokenExpiresAt: number;
};

let refreshPromise: Promise<boolean> | null = null;

const syncAccessTokenExpiryToStore = async (accessTokenExpiresAt: number) => {
  if (typeof window === 'undefined') return;

  try {
    const { useUserStore } = await import('@/shared/stores/userStore');
    const { user } = useUserStore.getState();
    if (!user) return;
    useUserStore.getState().setSession({ user, accessTokenExpiresAt });
  } catch {
    // store import 실패/환경 이슈는 무시하고 네트워크 흐름만 유지합니다.
  }
};

const clearSessionExpired = async () => {
  if (typeof window === 'undefined') return;
  try {
    const { useUserStore } = await import('@/shared/stores/userStore');
    useUserStore.getState().clearSession('expired');
  } catch {
    // ignore
  }
};

const refreshTokensOnce = async (): Promise<boolean> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      const data = await coreFetch<RefreshAuthTokensResponse>(
        `${BFF_BASE_URL}/auth/tokens`,
        { method: 'POST', credentials: 'include' },
        undefined
      );
      const accessTokenExpiresAt = data?.accessTokenExpiresAt;
      if (!accessTokenExpiresAt) return false;
      await syncAccessTokenExpiryToStore(accessTokenExpiresAt);
      return true;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

/** bffFetch 내부 공통 요청 함수 */
const request = <T>({
  endpoint,
  method,
  body,
  query,
  ...options
}: RequestConfig): Promise<T | null> => {
  const url = `${BFF_BASE_URL}${endpoint}${buildQueryString(query)}`;
  const doRequest = () => coreFetch<T>(url, { ...options, method, credentials: 'include' }, body);

  return (async () => {
    try {
      return await doRequest();
    } catch (error) {
      // 401이면(= access token 만료 가능성) refresh 후 1회 재시도합니다.
      if (error instanceof ApiError && error.status === 401 && !isAuthEndpoint(endpoint)) {
        const refreshed = await refreshTokensOnce();
        if (!refreshed) {
          await clearSessionExpired();
          throw error;
        }

        try {
          return await doRequest();
        } catch (retryError) {
          if (retryError instanceof ApiError && retryError.status === 401) {
            await clearSessionExpired();
          }
          throw retryError;
        }
      }

      throw error;
    }
  })();
};

/** HTTP 메서드 유틸리티 */
export const bffFetch = {
  get: <T>(endpoint: string, query?: QueryParams, options?: FetchRequestOptions) =>
    request<T>({ endpoint, method: 'GET', query, ...options }),

  post: <T>(endpoint: string, body?: unknown, options?: FetchRequestOptions) =>
    request<T>({ endpoint, method: 'POST', body, ...options }),

  put: <T>(endpoint: string, body?: unknown, options?: FetchRequestOptions) =>
    request<T>({ endpoint, method: 'PUT', body, ...options }),

  patch: <T>(endpoint: string, body?: unknown, options?: FetchRequestOptions) =>
    request<T>({ endpoint, method: 'PATCH', body, ...options }),

  delete: <T>(endpoint: string, options?: FetchRequestOptions) =>
    request<T>({ endpoint, method: 'DELETE', ...options }),

  postFormData: <T>(endpoint: string, formData: FormData, options?: FetchRequestOptions) =>
    request<T>({
      endpoint,
      method: 'POST',
      body: formData,
      isFormData: true,
      ...options,
    }),
};
