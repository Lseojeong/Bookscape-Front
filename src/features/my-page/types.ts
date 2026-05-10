import { z } from 'zod';

export const GetMyActivitiesQuerySchema = z.object({
  cursorId: z.number().optional(),
  size: z.number().optional(),
});

export type GetMyActivitiesQuery = z.infer<typeof GetMyActivitiesQuerySchema>;

export const MyActivitySummarySchema = z.object({
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

export type MyActivitySummary = z.infer<typeof MyActivitySummarySchema>;

export const GetMyActivitiesResponseSchema = z.object({
  cursorId: z.number().nullable().optional().default(null),
  totalCount: z.number().optional().default(0),
  activities: z.array(MyActivitySummarySchema).optional().default([]),
});

export type GetMyActivitiesResponse = z.infer<typeof GetMyActivitiesResponseSchema>;

export type GetMyActivityReservationDashboardQuery = {
  year: string;
  month: string;
};

export type MyActivityReservationDashboardItem = {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

export type GetMyActivityReservationDashboardResponse = MyActivityReservationDashboardItem[];

export type GetMyActivityReservedScheduleQuery = {
  date: string;
};

export type MyActivityReservedScheduleItem = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
};

export type GetMyActivityReservedScheduleResponse = MyActivityReservedScheduleItem[];

export type SellerReservationStatus = 'declined' | 'pending' | 'confirmed';

export type GetMyActivityReservationsQuery = {
  cursorId?: number;
  size?: number;
  scheduleId: number;
  status: SellerReservationStatus;
};

export type MyActivityReservation = {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: SellerReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type GetMyActivityReservationsResponse = {
  cursorId: number;
  totalCount: number;
  reservations: MyActivityReservation[];
};

export type UpdateMyActivityReservationStatusRequestBody = {
  status: SellerReservationStatus;
};

export type UpdateMyActivityReservationStatusResponse = {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: SellerReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type DeleteMyActivityResponse = undefined;

/** 체험 수정 요청 */
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

/** 체험 수정 응답 내 스케줄 */
export const UpdateMyActivityScheduleSchema = z.object({
  date: z.string(),
  times: z.array(
    z.object({
      id: z.number(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
});

/** 체험 수정 응답 내 서브 이미지 */
export const UpdateMyActivitySubImageSchema = z.object({
  id: z.number(),
  imageUrl: z.string(),
});

/** 체험 수정 응답 */
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
  subImages: z.array(UpdateMyActivitySubImageSchema),
  schedules: z.array(UpdateMyActivityScheduleSchema),
});

export type UpdateMyActivityRequestBody = z.infer<typeof UpdateMyActivityRequestBodySchema>;
export type UpdateMyActivityResponse = z.infer<typeof UpdateMyActivityResponseSchema>;
