import { z } from 'zod';
import { REGEX, COMMON_ERROR_MESSAGES } from '@/shared/constants/validation';

/**
 * 로그인 폼 유효성 검사 스키마입니다.
 */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, COMMON_ERROR_MESSAGES.EMAIL_REQUIRED)
    .email(COMMON_ERROR_MESSAGES.EMAIL_FORMAT),
  password: z.string().trim().min(1, COMMON_ERROR_MESSAGES.PASSWORD_REQUIRED),
});

/**
 * 회원가입 폼 유효성 검사 스키마입니다.
 */
export const signupSchema = z
  .object({
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
    passwordConfirm: z.string().trim().min(1, COMMON_ERROR_MESSAGES.PASSWORD_CONFIRM_REQUIRED),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: COMMON_ERROR_MESSAGES.PASSWORD_MISMATCH,
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
