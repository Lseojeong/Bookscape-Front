import { z } from 'zod';

/** UI 컴포넌트 전용 타입 */
export type Slot = {
  startTime: string;
  endTime: string;
};

export type ScheduleGroup = {
  date: Date;
  dateString: string;
  slots: Slot[];
};

/** 폼 전용 서브 이미지 스키마 */
export const FormSubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});

/** GET 상세조회 응답용 */
export const FlatScheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

/** POST, PATCH 응답용 */
export const NestedScheduleSchema = z.object({
  date: z.string(),
  times: z.array(z.object({ id: z.number(), startTime: z.string(), endTime: z.string() })),
});

/** 폼 초기 데이터용 상세 조회 (GET 응답) */
export const ActivityDetailForFormSchema = z.object({
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
  subImages: z.array(FormSubImageSchema),
  schedules: z.array(FlatScheduleSchema),
});
export type ActivityDetailForForm = z.infer<typeof ActivityDetailForFormSchema>;

/** 체험 등록 (POST 요청 및 응답) */
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
  subImages: z.array(FormSubImageSchema),
  schedules: z.array(NestedScheduleSchema),
});

export const CreateActivityImageUrlResponseSchema = z.object({
  activityImageUrl: z.string(),
});

export type CreateActivityRequestBody = z.infer<typeof CreateActivityRequestBodySchema>;
export type CreateActivityResponse = z.infer<typeof CreateActivityResponseSchema>;
export type CreateActivityImageUrlResponse = z.infer<typeof CreateActivityImageUrlResponseSchema>;

/** 체험 수정 (PATCH 요청 및 응답) */
export const UpdateMyActivityRequestBodySchema = z.object({
  title: z.string(),
  category: z.string(),
  description: z.string(),
  price: z.number(),
  address: z.string(),
  bannerImageUrl: z.string(),
  subImageIdsToRemove: z.array(z.number()),
  subImageUrlsToAdd: z.array(z.string()),
  scheduleIdsToRemove: z.array(z.number()),
  schedulesToAdd: z.array(
    z.object({
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
});

export const UpdateMyActivityResponseSchema = z.object({
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
  subImages: z.array(FormSubImageSchema),
  schedules: z.array(NestedScheduleSchema),
});

export type UpdateMyActivityRequestBody = z.infer<typeof UpdateMyActivityRequestBodySchema>;
export type UpdateMyActivityResponse = z.infer<typeof UpdateMyActivityResponseSchema>;
