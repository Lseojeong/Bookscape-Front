import {
  RequestConfig,
  coreFetch,
  FetchRequestOptions,
  QueryParams,
} from '@/shared/apis/coreFetch';

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

/** bffFetch 내부 공통 요청 함수 */
const request = <T>({
  endpoint,
  method,
  body,
  query,
  ...options
}: RequestConfig): Promise<T | null> => {
  return coreFetch<T>(BFF_BASE_URL, endpoint, { ...options, method }, query, body);
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
