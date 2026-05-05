import { cookies } from 'next/headers';
import { FetchRequestOptions, QueryParams, RequestConfig } from '@/shared/apis/base/coreFetch';
import { serverFetch } from '@/shared/apis/base/serverFetch';

/**
 *
 * 클라이언트 요청을 받아 서버 API로 전달하기 전에
 * 인증 정보(Access Token)를 쿠키에서 꺼내 `Authorization` 헤더에 주입하는 역할을 합니다.
 *
 * [동작 흐름]
 * proxyFetch
 *   ↓ (headers + body 전달)
 * serverFetch
 *   ↓
 * coreFetch
 *
 * @example
 * ``` ts
 * // GET 요청
 * const data = await proxyFetch.get<User>('/users/me');
 *
 * // POST 요청
 * const data = await proxyFetch.patch<Reservation>(`/my-reservation/${userId}`, {
 *  status,
 * });
 * ```
 */

const request = async <T>({
  endpoint,
  method,
  body,
  query,
  ...options
}: RequestConfig): Promise<T | null> => {
  // 1. 쿠키에서 토큰 꺼내기
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  // 2. 기존 headers + Authorization 병합
  const headers = new Headers(options.headers ?? {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const mergedOptions: FetchRequestOptions = {
    ...options,
    headers: Object.fromEntries(headers.entries()),
  };

  // method에 따라 분기
  switch (method) {
    case 'GET':
      return serverFetch.get<T>(endpoint, query, mergedOptions);

    case 'POST':
      return serverFetch.post<T>(endpoint, body, mergedOptions);

    case 'PUT':
      return serverFetch.put<T>(endpoint, body, mergedOptions);

    case 'PATCH':
      return serverFetch.patch<T>(endpoint, body, mergedOptions);

    case 'DELETE':
      return serverFetch.delete<T>(endpoint, mergedOptions);

    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};

/** HTTP 메서드 유틸리티 */
export const proxyFetch = {
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
};
