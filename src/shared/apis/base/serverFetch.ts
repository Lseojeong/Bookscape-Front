import {
  coreFetch,
  FetchRequestOptions,
  QueryParams,
  RequestConfig,
} from '@/shared/apis/base/coreFetch';
import { ENV } from '@/shared/apis/env';

/**
 * 서버 사이드 전용 Fetch 함수 (Server Components, Route Handlers, Server Actions 전용)
 * - ENV.SERVER_API_URL을 베이스로 coreFetch를 호출하는 것만 담당
 * - 인증이 필요한 요청은 proxyFetch를 통해서 사용
 *
 * @example
 * ```ts
 *  const data = await serverFetch.post<LoginResponse>('/auth/login', body);
 * ```
 */

/** serverFetch 내부 공통 요청 함수 */
const request = async <T>({
  endpoint,
  method,
  body,
  query,
  headers,
  ...options
}: RequestConfig): Promise<T | null> => {
  return coreFetch<T>(ENV.SERVER_API_URL, endpoint, { ...options, method, headers }, query, body);
};

/** HTTP 메서드 유틸리티 */
export const serverFetch = {
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
