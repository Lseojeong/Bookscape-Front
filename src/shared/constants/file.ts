/**
 * 이미지 업로드 관련 설정 상수입니다.
 */
export const IMAGE_RULES = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
  ],
} as const;

/**
 * 이미지 업로드 관련 에러 메시지입니다.
 */
export const IMAGE_ERROR_MESSAGES = {
  IMAGE_SIZE_EXCEEDED: '이미지 용량은 5MB를 초과할 수 없습니다',
  IMAGE_TYPE_INVALID: 'JPG, JPEG, PNG, WEBP, HEIC 파일만 업로드 가능합니다',
} as const;
