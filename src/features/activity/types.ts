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

export type CreateActivityRequestBody = {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Array<{
    date: string;
    startTime: string;
    endTime: string;
  }>;
  bannerImageUrl: string;
  subImageUrls: string[];
};

export type ActivitySubImage = {
  imageUrl: string;
  id: number;
};

export type ActivityScheduleTime = {
  endTime: string;
  startTime: string;
  id: number;
};

export type ActivitySchedule = {
  times: ActivityScheduleTime[];
  date: string;
};

export type CreateActivityResponse = {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: ActivitySubImage[];
  schedules: ActivitySchedule[];
};

export type CreateActivityImageUrlResponse = {
  activityImageUrl: string;
};

export type GetSearchActivityParams = {
  method?: string;
  category?: string;
  keyword?: string;
  page?: number;
  size?: number;
};

/** 체험 후기 작성자 */
export const ReviewUserSchema = z.object({
  profileImageUrl: z.string().nullable(),
  nickname: z.string(),
  id: z.number(),
});

/** 체험 후기 */
export const ActivityReviewSchema = z.object({
  id: z.number(),
  user: ReviewUserSchema,
  activityId: z.number(),
  rating: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/** 체험 후기 조회 응답 */
export const ActivityReviewsResponseSchema = z.object({
  averageRating: z.number(),
  totalCount: z.number(),
  reviews: z.array(ActivityReviewSchema),
});

export type ReviewUser = z.infer<typeof ReviewUserSchema>;
export type ActivityReview = z.infer<typeof ActivityReviewSchema>;
export type ActivityReviewsResponse = z.infer<typeof ActivityReviewsResponseSchema>;

/** 체험 후기 조회 파라미터 */
export type GetActivityReviewsParams = {
  activityId: number;
  page?: number;
  size?: number;
};
