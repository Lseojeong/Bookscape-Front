import { z } from 'zod';
import { COMMON_ERROR_MESSAGES } from '@/shared/constants/validation';
import { commonSchemas } from '@/shared/utils/schema';

/**
 * 로그인 폼 유효성 검사 스키마입니다.
 */
export const loginSchema = z.object({
  email: commonSchemas.email,
  password: z.string().trim().min(1, COMMON_ERROR_MESSAGES.PASSWORD_REQUIRED),
});

/**
 * 회원가입 폼 유효성 검사 스키마입니다.
 */
export const signupSchema = z
  .object({
    email: commonSchemas.email,
    nickname: commonSchemas.nickname,
    password: commonSchemas.password,
    passwordConfirm: z.string().trim().min(1, COMMON_ERROR_MESSAGES.PASSWORD_CONFIRM_REQUIRED),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: COMMON_ERROR_MESSAGES.PASSWORD_MISMATCH,
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
