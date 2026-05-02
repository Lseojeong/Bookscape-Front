import { z } from 'zod';
import { ACTIVITY_CATEGORIES } from '@/features/my-page/activity-form/constants/category';
import { ACTIVITY_ERROR_MESSAGES } from '@/features/my-page/activity-form/constants/validation';
import { IMAGE_RULES, IMAGE_ERROR_MESSAGES } from '@/shared/constants/file';

export const scheduleSchema = z.object({
  date: z.string().min(1, ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED),
  startTime: z.string().min(1, ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED),
  endTime: z.string().min(1, ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED),
});

/**
 * 이미지 파일 유효성 검사 스키마
 * 새롭게 업로드되는 File 객체의 용량과 확장자를 검사합니다.
 */
export const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size <= IMAGE_RULES.MAX_SIZE, IMAGE_ERROR_MESSAGES.IMAGE_SIZE_EXCEEDED)
  .refine(
    (file) => (IMAGE_RULES.ACCEPTED_TYPES as readonly string[]).includes(file.type),
    IMAGE_ERROR_MESSAGES.IMAGE_TYPE_INVALID
  );

/**
 * 체험 등록 및 수정 폼 유효성 검사 스키마입니다.
 */
export const activityFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, ACTIVITY_ERROR_MESSAGES.TITLE_REQUIRED)
    .max(50, ACTIVITY_ERROR_MESSAGES.TITLE_MAX_LENGTH),
  category: z.enum(ACTIVITY_CATEGORIES, {
    message: ACTIVITY_ERROR_MESSAGES.CATEGORY_REQUIRED,
  }),
  description: z.string().trim().min(1, ACTIVITY_ERROR_MESSAGES.DESCRIPTION_REQUIRED),
  price: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.coerce
      .number({ message: ACTIVITY_ERROR_MESSAGES.PRICE_REQUIRED })
      .min(0, ACTIVITY_ERROR_MESSAGES.PRICE_REQUIRED)
  ),
  address: z.string().trim().min(1, ACTIVITY_ERROR_MESSAGES.ADDRESS_REQUIRED),
  detailAddress: z.string().trim().min(1, ACTIVITY_ERROR_MESSAGES.DETAIL_ADDRESS_REQUIRED),
  schedules: z
    .array(scheduleSchema)
    .min(1, ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED)
    .superRefine((list, ctx) => {
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const s1 = list[i];
          const s2 = list[j];

          if (s1.date === s2.date) {
            // 시간대가 겹치는지 확인
            const isOverlap = s1.startTime < s2.endTime && s2.startTime < s1.endTime;

            if (isOverlap) {
              // 겹치는 교집합 구간을 계산
              const overlapStart = s1.startTime > s2.startTime ? s1.startTime : s2.startTime;
              const overlapEnd = s1.endTime < s2.endTime ? s1.endTime : s2.endTime;

              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                // 교집합 시간을 띄움
                message: ACTIVITY_ERROR_MESSAGES.SCHEDULE_OVERLAP(
                  s1.date,
                  overlapStart,
                  overlapEnd
                ),
                path: [],
              });
              return;
            }
          }
        }
      }
    }),
  bannerImage: z
    // string(수정 시 기존 URL) 또는 File(신규 업로드) 둘 다 허용
    .union([z.string(), imageFileSchema])
    .nullable()
    .refine((val) => val !== null && val !== '', ACTIVITY_ERROR_MESSAGES.BANNER_REQUIRED),

  subImages: z
    .array(z.union([z.string(), imageFileSchema]))
    .max(4)
    .optional(),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;
