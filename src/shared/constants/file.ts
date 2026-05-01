/**
 * 이미지 업로드 관련 설정 상수입니다.
 */
export const IMAGE_RULES = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
} as const;
