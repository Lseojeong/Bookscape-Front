import { ApiError } from './apiError';
import { ENV } from './env';
/**
 * fetchInstance는 API 요청을 처리하는 유틸리티 함수입니다.
 * - endpoint: API 엔드포인트 URL (기본 URL은 ENV.API_BASE_URL로 설정)
 * - options: fetch 요청에 사용할 추가 옵션 (method, headers 등)
 * - query: URL에 추가할 쿼리 문자열
 * - body: 요청 본문 데이터 (JSON 또는 FormData)
 *
 * 이 함수는 요청을 보내고 응답을 처리하여 JSON 데이터를 반환합니다.
 * 요청이 실패하면 ApiError를 throw합니다.
 * 또한, 요청 타임아웃을 설정하여 일정 시간 내에 응답이 없으면 요청을 취소합니다.
 * @example
 * // GET 요청 예시
 *  export const getActivities = () =>
 *  get<ActivityListResponse>('/activities');
 *
 * // POST 요청 예시
 *  export const login = (body: LoginBody) =>
 *  post<LoginResponse>('/auth/login', body);
 *
 * // FormData를 사용하는 POST 요청 예시
 *  export const uploadImage = (formData: FormData) =>
 *  postFormData<UploadResponse>('/images/upload', formData);
 */

const REQUEST_TIMEOUT = 5000;
const JSON_CONTENT_TYPE = 'application/json';

type FetchRequestOptions = RequestInit & {
  isFormData?: boolean;
};

type RequestConfig = {
  endpoint: string;
  method: RequestInit['method'];
  body?: unknown;
  query?: string;
} & Omit<FetchRequestOptions, 'body'>;

const buildRequestUrl = (endpoint: string, query = '') => {
  const baseUrl = ENV.API_BASE_URL.endsWith('/') ? ENV.API_BASE_URL : `${ENV.API_BASE_URL}/`;
  const url = new URL(endpoint.replace(/^\//, ''), baseUrl);
  if (query) {
    url.search = query.startsWith('?') ? query : `?${query}`;
  }
  return url.toString();
};

const requestBodyWithContentType = (
  body: unknown,
  isFormData: boolean
): { body?: BodyInit; headers?: Record<string, string> } => {
  if (body === undefined) return {};
  if (isFormData) return { body: body as BodyInit };
  return {
    body: JSON.stringify(body),
    headers: { 'Content-Type': JSON_CONTENT_TYPE },
  };
};

export async function fetchInstance<T>(
  endpoint: string,
  options: FetchRequestOptions = {},
  query = '',
  body?: unknown
): Promise<T | null> {
  const url = buildRequestUrl(endpoint, query);
  const { isFormData = false, ...requestOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  const signal = options.signal
    ? AbortSignal.any([controller.signal, options.signal])
    : controller.signal;

  try {
    const { body: requestBody, headers: extraHeaders } = requestBodyWithContentType(
      body,
      isFormData
    );

    const res = await fetch(url, {
      ...requestOptions,
      headers: {
        ...extraHeaders,
        ...requestOptions.headers,
      },
      signal,
      ...(requestBody !== undefined ? { body: requestBody } : {}),
    });

    const text = await res.text();
    const isJson = res.headers.get('content-type')?.includes(JSON_CONTENT_TYPE);
    const data = (() => {
      if (!text || !isJson) return null;
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    })();

    if (!res.ok) {
      throw new ApiError(res.status, data?.message || text || `API 요청 실패: ${res.status}`);
    }

    if (res.status === 204) return null;

    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}

const request = <T>({ endpoint, method, body, query = '', ...options }: RequestConfig) =>
  fetchInstance<T>(endpoint, { ...options, method }, query, body);

export const get = <T>(endpoint: string, options?: FetchRequestOptions) =>
  request<T>({ endpoint, method: 'GET', ...options });

export const post = <T>(endpoint: string, body: unknown, options?: FetchRequestOptions) =>
  request<T>({ endpoint, method: 'POST', body, ...options });

export const put = <T>(endpoint: string, body: unknown, options?: FetchRequestOptions) =>
  request<T>({ endpoint, method: 'PUT', body, ...options });

export const patch = <T>(endpoint: string, body: unknown, options?: FetchRequestOptions) =>
  request<T>({ endpoint, method: 'PATCH', body, ...options });

export const del = <T>(endpoint: string, options?: FetchRequestOptions) =>
  request<T>({ endpoint, method: 'DELETE', ...options });

export const postFormData = <T>(
  endpoint: string,
  formData: FormData,
  options?: FetchRequestOptions
) => request<T>({ endpoint, method: 'POST', body: formData, isFormData: true, ...options });
