/**
 *  ## JwtPayload
 *  @type {number} exp - 만료 시각
 *  @type {number} iat - 발급 시각
 */
type JwtPayload = {
  exp: number;
  iat: number;
};

/**
 * ## parseJwtPayload
 * JWT 토큰의 payload를 디코딩하여 반환합니다.
 *
 * @param token - JWT 문자열
 * @returns JwtPayload
 */
const parseJwtPayload = (token: string): JwtPayload => {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return { exp: 0, iat: 0 };

    const payloadBase64 = parts[1];
    if (!payloadBase64) return { exp: 0, iat: 0 };

    // JWT는 base64url을 사용합니다.
    const payloadJson = Buffer.from(payloadBase64, 'base64url').toString('utf-8');
    const payload = JSON.parse(payloadJson) as Partial<JwtPayload>;

    return {
      exp: typeof payload.exp === 'number' ? payload.exp : 0,
      iat: typeof payload.iat === 'number' ? payload.iat : 0,
    };
  } catch {
    return { exp: 0, iat: 0 };
  }
};

/**
 * ## getJwtMaxAge
 * JWT 토큰의 payload를 디코딩하여
 * 현재 시점 기준으로 남아있는 유효 시간을 초 단위로 반환합니다.
 *
 * @param {string} token - JWT 문자열 (accessToken 또는 refreshToken)
 * @returns {number} 토큰 유효시간
 */
export const getJwtMaxAge = (token: string): number => {
  const { exp } = parseJwtPayload(token);

  const now = Math.floor(Date.now() / 1_000);
  return Math.max(exp - now, 0);
};

/**
 * ## getJwtExpiresAt
 * JWT 토큰의 payload를 디코딩하여
 * 만료 시각을 ms timestamp로 반환합니다.
 *
 * @param {string} token - JWT 문자열
 * @returns {number} 만료 시각 (ms)
 */
export const getJwtExpiresAt = (token: string): number => {
  const { exp } = parseJwtPayload(token);

  return exp * 1_000;
};
