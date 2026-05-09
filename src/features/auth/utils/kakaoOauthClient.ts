/**
 * 카카오 OAuth 인가 요청 시작 엔드포인트(BFF).
 *
 * @remarks
 * 클라이언트에서 `window.location.replace(...)`로 이동해 OAuth 흐름을 시작합니다.
 */
export const KAKAO_OAUTH_START_SIGNIN_URL = '/api/oauth/kakao/authorization?mode=signin';
export const KAKAO_OAUTH_START_SIGNUP_URL = '/api/oauth/kakao/authorization?mode=signup';

/**
 * 카카오 OAuth 회원가입 시 서버에 전달할 임시 닉네임을 생성합니다.
 *
 * @remarks
 * 카카오 프로필에 닉네임이 없거나, 최초 가입 시 닉네임이 필수인 경우를 대비합니다.
 */
export const generateKakaoTempNickname = (): string => {
  const rand = Math.random().toString(36).slice(2, 6);
  return `kakao${rand}`;
};

/**
 * 회원가입 요청 중 "이미 가입된 사용자"로 판단되는 에러 메시지인지 확인합니다.
 *
 * @remarks
 * 서버 메시지 포맷이 고정되어 있지 않아 키워드 포함 여부로 판단합니다.
 */
export const isAlreadyRegisteredKakaoUserError = (message: string): boolean => {
  return message.includes('이미') && (message.includes('등록') || message.includes('가입'));
};

/**
 * 로그인 요청 중 "미가입 사용자"로 판단되는 에러 메시지인지 확인합니다.
 *
 * @remarks
 * 서버 메시지 포맷이 고정되어 있지 않아 키워드 포함 여부로 판단합니다.
 */
export const isNotRegisteredKakaoUserError = (message: string): boolean => {
  const normalized = message.trim();
  if (!normalized) return false;

  return (
    normalized.includes('미가입') ||
    normalized.includes('가입되지') ||
    normalized.includes('등록되지') ||
    normalized.includes('존재하지')
  );
};
