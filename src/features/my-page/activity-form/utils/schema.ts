import { z } from 'zod';
import { ACTIVITY_CATEGORIES } from '@/features/my-page/activity-form/constants/category';
import { ACTIVITY_ERROR_MESSAGES } from '@/features/my-page/activity-form/constants/validation';

export const scheduleSchema = z.object({
  date: z.string().min(1, ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED),
  startTime: z.string().min(1, ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED),
  endTime: z.string().min(1, ACTIVITY_ERROR_MESSAGES.SCHEDULE_REQUIRED),
});

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
  price: z.coerce
    .number({ message: ACTIVITY_ERROR_MESSAGES.PRICE_REQUIRED })
    .min(0, ACTIVITY_ERROR_MESSAGES.PRICE_REQUIRED),
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
    .any()
    .refine(
      (file) => file !== undefined && file !== null && file !== '',
      ACTIVITY_ERROR_MESSAGES.BANNER_REQUIRED
    ),
  subImages: z.array(z.any()).max(4).optional(),
});

export type ActivityFormValues = z.infer<typeof activityFormSchema>;
