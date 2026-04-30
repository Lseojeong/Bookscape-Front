import { cookies } from 'next/headers';
import { FetchRequestOptions, RequestConfig } from '@/shared/apis/coreFetch';
import { serverFetch } from '@/shared/apis/serverFetch';

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
 * const data = await proxyFetch<User>({
 *   endpoint: '/users/me',
 *   method: 'GET',
 * });
 *
 * // POST 요청
 * const result = await proxyFetch({
 *   endpoint: '/reservations',
 *   method: 'POST',
 *   body: { date: '2025-01-01' },
 * });
 * ```
 */
export const proxyFetch = async <T>({
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
    headers,
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
