import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ApiError } from '@/shared/apis/apiError';
import { COMMON_MESSAGE } from '@/shared/constants/message';

/**
 * 인증이 필요한 Route Handler에서 handler로 전달되는 컨텍스트 타입
 *
 * @template TBody - 요청 body의 타입 (JSON, FormData 등)
 * @property accessToken - 인증된 사용자의 access token
 * @property body - HTTP 요청 body (GET/DELETE에서는 undefined)
 * @property request - 원본 Request 객체
 */
export type AuthorizedHandlerContext<TBody = unknown> = {
  accessToken: string;
  body?: TBody;
  request: Request;
};

export type RouteHandlerParams = Record<string, string | string[]>;

export type AuthorizedHandlerContextWithParams<
  TBody = unknown,
  TParams extends RouteHandlerParams = RouteHandlerParams,
> = AuthorizedHandlerContext<TBody> & {
  params?: TParams;
};

type CreateAuthorizedRouteOptions = {
  /**
   * accessToken 쿠키가 없을 때 반환할 메시지
   * (기본값: COMMON_MESSAGE.ERROR.UNAUTHORIZED)
   */
  unauthorizedMessage?: string;
  /**
   * accessToken을 읽어올 쿠키 키
   * (기본값: 'accessToken')
   */
  accessTokenCookieKey?: string;
};

const parseRequestBody = async (request: Request): Promise<unknown> => {
  if (request.method === 'GET' || request.method === 'DELETE') return undefined;

  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('multipart/form-data')) {
    return request.formData();
  }

  if (contentType.includes('application/json')) {
    // body가 비어있을 때 request.json()이 throw할 수 있어 text 기반 파싱 사용
    const text = await request.text();
    if (!text) return undefined;
    try {
      return JSON.parse(text) as unknown;
    } catch {
      throw new ApiError(400, '요청 본문이 올바른 JSON 형식이 아닙니다.');
    }
  }

  return undefined;
};

/**
 * ## createAuthorizedRoute
 *
 * @description
 * 인증이 필요한 Next.js Route Handler를 생성하는 고차 함수입니다.
 * - 쿠키에서 accessToken 존재 여부를 검사합니다.
 * - HTTP 메서드에 따라 요청 body를 안전하게 파싱합니다.
 *   - `GET`, `DELETE` → body 파싱하지 않음
 *   - 그 외 메서드
 *     - `multipart/form-data` → `request.formData()`
 *     - `application/json` → 빈 body를 고려하여 text 파싱
 * - handler 실행 중 발생한 에러를 HTTP Response로 변환합니다.
 *
 * @template TBody - handler에서 사용할 요청 body 타입
 * @template TParams - handler에서 사용할 params 타입 (동적 라우트용)
 * @param handler - 인증 및 body 파싱이 완료된 후 실행될 함수
 * @param options - 쿠키 키/401 메시지 커스터마이징 옵션
 * @returns - Next.js Route Handler 함수
 */
export const createAuthorizedRoute = <
  TBody = unknown,
  TParams extends RouteHandlerParams = RouteHandlerParams,
>(
  handler: (ctx: AuthorizedHandlerContextWithParams<TBody, TParams>) => Promise<unknown>,
  options: CreateAuthorizedRouteOptions = {}
): ((request: NextRequest, context?: { params?: Promise<TParams> }) => Promise<Response>) => {
  return async (request: NextRequest, context?: { params?: Promise<TParams> }) => {
    const cookieStore = await cookies();
    const accessTokenCookieKey = options.accessTokenCookieKey ?? 'accessToken';
    const accessToken = cookieStore.get(accessTokenCookieKey)?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: options.unauthorizedMessage ?? COMMON_MESSAGE.ERROR.UNAUTHORIZED },
        { status: 401 }
      );
    }

    try {
      const body = (await parseRequestBody(request)) as TBody;
      const params = await context?.params;

      const result = await handler({
        accessToken,
        body,
        request,
        params,
      });

      if (result instanceof Response) return result;

      if (result === undefined) {
        return new NextResponse(null, { status: 204 });
      }

      return NextResponse.json(result);
    } catch (error) {
      if (error instanceof ApiError) {
        return NextResponse.json({ message: error.message }, { status: error.status });
      }

      return NextResponse.json({ message: COMMON_MESSAGE.ERROR.INTERNAL }, { status: 500 });
    }
  };
};
