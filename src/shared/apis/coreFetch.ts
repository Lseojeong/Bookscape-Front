import { ApiError } from './apiError';
/**
 * 핵심 fetch 엔진
 * coreFetch는 API 요청을 수행하는 유틸리티 함수입니다. 이 함수는 Fetch API를 사용하여 HTTP 요청을 보내고, 응답을 처리합니다.
 * 주요 기능:
 * - 요청 URL을 구성하고, 쿼리 파라미터를 추가할 수 있습니다.
 * - 요청 본문을 JSON 또는 FormData로 자동 변환합니다.
 * - 응답이 JSON인 경우 자동으로 파싱하여 반환합니다.
 * - 요청이 실패한 경우 ApiError를 던집니다.
 * - 요청 타임아웃을 지원하여, 지정된 시간 내에 응답이 없으면 요청을 취소합니다.
 * - AbortSignal을 지원하여, 외부에서 요청을 취소할 수 있습니다.
 * @example
 * ```ts
 * import { coreFetch } from './coreFetch';
 *
 * async function fetchData() {
 *   try {
 *     const data = await coreFetch('https://api.example.com', '/data', {
 *       method: 'GET',
 *     });
 *     console.log(data);
 *   } catch (error) {
 *     if (error instanceof ApiError) {
 *       console.error(`API Error: ${error.status} - ${error.message}`);
 *     } else {
 *       console.error('Unexpected Error:', error);
 *     }
 *   }
 * }
 * ```
 */

const REQUEST_TIMEOUT = 5000;

type FetchRequestOptions = RequestInit & {
  isFormData?: boolean;
};

const buildRequestUrl = (baseUrl: string, endpoint: string, query = '') => {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const url = new URL(endpoint.replace(/^\//, ''), base);
  if (query) {
    url.search = query.startsWith('?') ? query : `?${query}`;
  }
  return url.toString();
};

const parseBody = (
  body: unknown,
  isFormData: boolean
): { body?: BodyInit; headers?: Record<string, string> } => {
  if (body === undefined) return {};
  if (isFormData) return { body: body as BodyInit };
  return {
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  };
};

const parseResponse = (text: string, isJson: boolean) => {
  if (!text || !isJson) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
};

export async function coreFetch<T>(
  baseUrl: string,
  endpoint: string,
  options: FetchRequestOptions = {},
  query = '',
  body?: unknown
): Promise<T | null> {
  const url = buildRequestUrl(baseUrl, endpoint, query);
  const { isFormData = false, ...requestOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  const signal = options.signal
    ? AbortSignal.any([controller.signal, options.signal])
    : controller.signal;

  try {
    const { body: requestBody, headers: extraHeaders } = parseBody(body, isFormData);

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
    const isJson = res.headers.get('content-type')?.includes('application/json') ?? false;
    const data = parseResponse(text, isJson);

    if (!res.ok) {
      throw new ApiError(
        res.status,
        data?.message || res.statusText || `API 요청 실패: ${res.status}`
      );
    }

    if (res.status === 204) return null;

    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}
