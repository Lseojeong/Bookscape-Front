import { z } from 'zod';

/** 체험 상세 서브 이미지 */
export const SubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});

/** 체험 상세 조회 응답 */
export const ActivityDetailSchema = z.object({
  id: z.number(),
  bannerImageUrl: z.string(),
  subImages: z.array(SubImageSchema),
  category: z.string(),
  title: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  address: z.string(),
  description: z.string(),
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

/** 체험 스케줄 응답 */
export const ActivityScheduleSchema = z.object({
  date: z.string(),
  times: z.array(
    z.object({
      id: z.number(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
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
  updatedAt: z.string(),
  subImages: z.array(SubImageSchema),
  schedules: z.array(ActivityScheduleSchema),
});

/** 체험 등록 이미지 응답 */
export const CreateActivityImageUrlResponseSchema = z.object({
  activityImageUrl: z.string(),
});

export type CreateActivityRequestBody = z.infer<typeof CreateActivityRequestBodySchema>;
export type ActivitySchedule = z.infer<typeof ActivityScheduleSchema>;
export type ActivityScheduleTime = ActivitySchedule['times'][number];
export type ActivitySubImage = z.infer<typeof SubImageSchema>;
export type CreateActivityResponse = z.infer<typeof CreateActivityResponseSchema>;
export type CreateActivityImageUrlResponse = z.infer<typeof CreateActivityImageUrlResponseSchema>;
export type ActivityDetailResponse = CreateActivityResponse;

export type GetSearchActivityParams = {
  method?: string;
  category?: string;
  keyword?: string;
  page?: number;
  size?: number;
};
