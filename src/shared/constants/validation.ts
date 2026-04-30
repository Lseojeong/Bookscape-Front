/**
 * 전역에서 공통으로 사용되는 정규식 패턴입니다.
 */
export const REGEX = {
  // 영문, 숫자, 특수문자 조합 (복붙 방지)
  PASSWORD_CHARS: /^[a-zA-Z0-9!@#$%^&*()_+~`|{}[\]:;?><,./\-=]+$/,
  // 영문, 숫자, 특수문자가 각각 1개 이상
  PASSWORD_COMBINATION: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+~`|{}[\]:;?><,./\-=]).+$/,
  // 영문, 한글, 자음/모음 허용
  NICKNAME_NO_SPECIAL_CHARS: /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]+$/,
  // 영문 및 완전한 한글 (자음, 모음 단독 사용 불가)
  NICKNAME_COMPLETE_HANGUL: /^[a-zA-Z가-힣]+$/,
};

/**
 * 여러 도메인(Auth, User)에서 공통으로 사용되는 에러 메시지입니다.
 */
export const COMMON_ERROR_MESSAGES = {
  EMAIL_REQUIRED: '이메일을 작성해주세요',
  EMAIL_FORMAT: '이메일 형식으로 작성해주세요',
  PASSWORD_REQUIRED: '비밀번호를 작성해주세요',
  PASSWORD_LENGTH: '비밀번호는 8자 이상으로 작성해주세요',
  PASSWORD_CHARS: '비밀번호는 영문, 숫자, 특수문자만 사용해주세요',
  PASSWORD_FORMAT: '비밀번호는 숫자, 영문, 특수문자를 모두 포함해주세요',
  PASSWORD_MISMATCH: '비밀번호가 일치하지 않습니다',
  PASSWORD_CONFIRM_REQUIRED: '비밀번호 확인을 작성해주세요',
  NICKNAME_REQUIRED: '닉네임을 작성해주세요',
  NICKNAME_LENGTH: '닉네임은 최대 6자 이내로 작성해주세요',
  NICKNAME_FORMAT: '닉네임은 영어, 한글로만 작성해주세요',
  NICKNAME_INCOMPLETE: '완전한 한글로 작성해주세요',
};
