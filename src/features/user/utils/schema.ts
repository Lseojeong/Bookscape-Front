import { z } from 'zod';
import { REGEX, COMMON_ERROR_MESSAGES } from '@/shared/constants/validation';

/**
 * 내 정보 수정 폼 유효성 검사 스키마입니다.
 * 비밀번호를 변경하지 않을 경우 빈 문자열을 허용합니다.
 */
export const profileSchema = z
  .object({
    nickname: z
      .string()
      .trim()
      .min(1, COMMON_ERROR_MESSAGES.NICKNAME_REQUIRED)
      .max(6, COMMON_ERROR_MESSAGES.NICKNAME_LENGTH)
      .regex(REGEX.NICKNAME_NO_SPECIAL_CHARS, COMMON_ERROR_MESSAGES.NICKNAME_FORMAT)
      .regex(REGEX.NICKNAME_COMPLETE_HANGUL, COMMON_ERROR_MESSAGES.NICKNAME_INCOMPLETE),

    newPassword: z
      .string()
      .trim()
      .refine((val) => val === '' || val.length >= 8, COMMON_ERROR_MESSAGES.PASSWORD_LENGTH)
      .refine(
        (val) => val === '' || REGEX.PASSWORD_CHARS.test(val),
        COMMON_ERROR_MESSAGES.PASSWORD_CHARS
      )
      .refine(
        (val) => val === '' || REGEX.PASSWORD_COMBINATION.test(val),
        COMMON_ERROR_MESSAGES.PASSWORD_FORMAT
      ),

    passwordConfirm: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    // 새 비밀번호를 입력 중인데 확인란이 비어있는 경우
    if (data.newPassword !== '' && data.passwordConfirm === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호 확인을 작성해주세요',
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
