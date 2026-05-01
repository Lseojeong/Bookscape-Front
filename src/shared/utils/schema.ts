import { z } from 'zod';
import { REGEX, COMMON_ERROR_MESSAGES } from '@/shared/constants/validation';

/**
 * 전역에서 공통으로 사용되는 Zod 필드 스키마입니다.
 */
export const commonSchemas = {
  email: z
    .string()
    .trim()
    .min(1, COMMON_ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(COMMON_ERROR_MESSAGES.EMAIL_FORMAT),
  nickname: z
    .string()
    .trim()
    .min(1, COMMON_ERROR_MESSAGES.NICKNAME_REQUIRED)
    .max(6, COMMON_ERROR_MESSAGES.NICKNAME_LENGTH)
    // 특수문자나 숫자 있는지 검사
    .regex(REGEX.NICKNAME_NO_SPECIAL_CHARS, COMMON_ERROR_MESSAGES.NICKNAME_FORMAT)
    // 완전한 한글인지 검사
    .regex(REGEX.NICKNAME_COMPLETE_HANGUL, COMMON_ERROR_MESSAGES.NICKNAME_INCOMPLETE),
  password: z
    .string()
    .trim()
    .min(1, COMMON_ERROR_MESSAGES.PASSWORD_REQUIRED)
    .min(8, COMMON_ERROR_MESSAGES.PASSWORD_LENGTH)
    .regex(REGEX.PASSWORD_CHARS, COMMON_ERROR_MESSAGES.PASSWORD_CHARS)
    .regex(REGEX.PASSWORD_COMBINATION, COMMON_ERROR_MESSAGES.PASSWORD_FORMAT),
};
