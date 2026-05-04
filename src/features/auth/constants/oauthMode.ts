/**
 * OAuth 플로우에서 사용하는 모드입니다.
 * - signin: 기존 유저 로그인
 * - signup: 신규 유저 회원가입
 */
export const OAUTH_MODES = ['signin', 'signup'] as const;

export type OAuthMode = (typeof OAUTH_MODES)[number];

export const DEFAULT_OAUTH_MODE: OAuthMode = 'signin';

export function isOAuthMode(value: unknown): value is OAuthMode {
  return typeof value === 'string' && (OAUTH_MODES as readonly string[]).includes(value);
}
