import { z } from 'zod';

/** 체험 상세 서브 이미지 */
export const SubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});

/** 체험 상세 조회 응답 */
export const ActivityDetailSchema = z.object({
  id: z.number(),
  userId: z.number(),
  bannerImageUrl: z.string(),
  subImages: z.array(SubImageSchema),
  category: z.string(),
  title: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  address: z.string(),
  description: z.string(),
  price: z.number(),
});

export type SubImage = z.infer<typeof SubImageSchema>;
export type ActivityDetail = z.infer<typeof ActivityDetailSchema>;

/** 체험 리스트 조회 */
export const ActivityDataSchema = z.object({
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
  updatedAt: z.string(),
});

/** GET /activities 응답 */
export const ActivityResponseSchema = z.object({
  activities: z.array(ActivityDataSchema),
  totalCount: z.number(),
});

export type ActivityData = z.infer<typeof ActivityDataSchema>;
export type ActivityResponse = z.infer<typeof ActivityResponseSchema>;

/** 예약 가능 스케줄 시간 */
export const ActivityScheduleTimeSchema = z.object({
  id: z.number(),
  startTime: z.string(),
  endTime: z.string(),
});

/** 예약 가능 스케줄 */
export const ActivityScheduleSchema = z.object({
  date: z.string(),
  times: z.array(ActivityScheduleTimeSchema),
});

export type ActivityScheduleTime = z.infer<typeof ActivityScheduleTimeSchema>;
export type ActivitySchedule = z.infer<typeof ActivityScheduleSchema>;
export type ActivitySubImage = z.infer<typeof SubImageSchema>;

export type GetActivityParams = {
  method?: 'offset' | 'cursor';
  category?: string;
  keyword?: string;
  sort?: string;
  page?: number;
  size?: number;
};
