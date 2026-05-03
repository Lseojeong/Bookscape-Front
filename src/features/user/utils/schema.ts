import { z } from 'zod';
import { COMMON_ERROR_MESSAGES } from '@/shared/constants/validation';
import { commonSchemas } from '@/shared/utils/schema';

/**
 * 내 정보 수정 폼 유효성 검사 스키마입니다.
 * 비밀번호를 변경하지 않을 경우 빈 문자열을 허용합니다.
 */
export const profileSchema = z
  .object({
    nickname: commonSchemas.nickname,
    newPassword: z.literal('').or(commonSchemas.password),
    passwordConfirm: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    // 새 비밀번호를 입력 중인데 확인란이 비어있는 경우
    if (data.newPassword !== '' && data.passwordConfirm === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: COMMON_ERROR_MESSAGES.PASSWORD_CONFIRM_REQUIRED,
        path: ['passwordConfirm'],
      });
    }
    // 비밀번호가 확인란과 일치하지 않는 경우
    else if (data.newPassword !== '' && data.newPassword !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: COMMON_ERROR_MESSAGES.PASSWORD_MISMATCH,
        path: ['passwordConfirm'],
      });
    }
  });

export type ProfileFormValues = z.infer<typeof profileSchema>;
