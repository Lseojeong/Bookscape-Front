import {
  coreFetch,
  FetchRequestOptions,
  QueryParams,
  RequestConfig,
} from '@/shared/apis/coreFetch';
import { ENV } from '@/shared/apis/env';
/**
 * 토큰 없는 공개 API용 Fetch 유틸리티
 * publicFetch는 인증이 필요 없는 공개 API 요청을 위한 유틸리티 함수입니다. 이 함수는 coreFetch를 기반으로 하며, API 요청을 간편하게 수행할 수 있도록 도와줍니다.
 * 주요 기능:
 * - API 요청을 위한 기본 URL을 ENV에서 가져옵니다.
 * - HTTP 메서드별로 get, post, put, patch, delete 함수를 제공합니다.
 * - FormData를 사용하는 POST 요청을 위한 postFormData 함수를 제공합니다.
 * @example
 * ```ts
 * import { get } from './publicFetch';
 *
 * async function fetchPublicData() {
 *   try {
 *     const data = await get('/public/data');
 *     console.log(data);
 *   } catch (error) {
 *     console.error('Error fetching public data:', error);
 *   }
 * }
 * ```
 */

type BaseRequestOptions = Omit<FetchRequestOptions, 'body' | 'isFormData'>;

const request = <T>({ endpoint, method, body, query, ...options }: RequestConfig) =>
  coreFetch<T>(ENV.API_BASE_URL, endpoint, { ...options, method }, query, body);

export const get = <T>(endpoint: string, query?: QueryParams, options?: BaseRequestOptions) =>
  request<T>({ endpoint, method: 'GET', query, ...options });

export const post = <T>(endpoint: string, body: unknown, options?: FetchRequestOptions) =>
  request<T>({ endpoint, method: 'POST', body, ...options });

export const put = <T>(endpoint: string, body: unknown, options?: FetchRequestOptions) =>
  request<T>({ endpoint, method: 'PUT', body, ...options });

export const patch = <T>(endpoint: string, body: unknown, options?: FetchRequestOptions) =>
  request<T>({ endpoint, method: 'PATCH', body, ...options });

export const del = <T>(endpoint: string, options?: BaseRequestOptions) =>
  request<T>({ endpoint, method: 'DELETE', ...options });

export const postFormData = <T>(
  endpoint: string,
  formData: FormData,
  options?: FetchRequestOptions
) =>
  request<T>({
    endpoint,
    method: 'POST',
    body: formData,
    isFormData: true,
    ...options,
  });
