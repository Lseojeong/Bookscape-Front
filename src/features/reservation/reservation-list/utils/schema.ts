import { z } from 'zod';
import { RESERVATION_ERROR_MESSAGES } from '@/features/reservation/reservation-list/constants/validation';

/**
 * 리뷰 작성 폼 유효성 검사 스키마입니다.
 */
export const reviewFormSchema = z.object({
  rating: z.number().min(1, RESERVATION_ERROR_MESSAGES.RATING_REQUIRED),
  content: z.string().trim().min(1, RESERVATION_ERROR_MESSAGES.REVIEW_REQUIRED),
});

export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
