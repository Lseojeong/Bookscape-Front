import { cookies } from 'next/headers';
import { ENV } from '@/shared/apis/env';
import { coreFetch, FetchRequestOptions, QueryParams, RequestConfig } from './coreFetch';

/**
 * 서버 사이드 전용 Fetch 함수 (Server Components, Route Handlers, Server Actions 전용)
 *
 * - Base URL: process.env.API_URL
 * - 인증: 서버 쿠키에서 읽은 Bearer 토큰을 Authorization 헤더에 주입
 *
 * @example
 * ```ts
 * // GET 요청
 * const user = await serverFetch.get<User>('/users/me');
 *
 * // POST 요청
 * const data = await serverFetch.post<{ accessToken: string }>(
 *  '/auth/tokens', { email, password }
 * );
 * ```
 */

/** serverFetch 내부 공통 요청 함수 */
const request = async <T>({
  endpoint,
  method,
  body,
  query,
  ...options
}: RequestConfig): Promise<T | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const headers = Object.fromEntries(new Headers(options.headers).entries());
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return coreFetch<T>(ENV.API_BASE_URL, endpoint, { ...options, method, headers }, query, body);
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
