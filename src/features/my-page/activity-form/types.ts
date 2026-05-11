export type Slot = {
  startTime: string;
  endTime: string;
};

export type ScheduleGroup = {
  date: Date;
  dateString: string;
  slots: Slot[];
};

import { z } from 'zod';
import { SubImageSchema, ActivityScheduleSchema } from '@/features/activity/types';

/** 체험 등록 요청 */
export const CreateActivityRequestBodySchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  address: z.string(),
  price: z.number(),
  schedules: z.array(
    z.object({
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
  bannerImageUrl: z.string(),
  subImageUrls: z.array(z.string()),
});

/** 체험 등록 응답 */
export const CreateActivityResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  createdAt: z.string(),
  subImages: z.array(SubImageSchema),
  schedules: z.array(ActivityScheduleSchema),
});

/** 체험 등록 이미지 응답 */
export const CreateActivityImageUrlResponseSchema = z.object({
  activityImageUrl: z.string(),
});

export type CreateActivityRequestBody = z.infer<typeof CreateActivityRequestBodySchema>;
export type CreateActivityResponse = z.infer<typeof CreateActivityResponseSchema>;
export type CreateActivityImageUrlResponse = z.infer<typeof CreateActivityImageUrlResponseSchema>;
