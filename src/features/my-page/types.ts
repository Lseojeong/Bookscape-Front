import { z } from 'zod';

// ─── 내 체험 목록 조회 ───────────────────────────────────────────

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

// ─── 내 체험 월별 예약 현황 조회 ────────────────────────────────

export const GetMyActivityReservationDashboardQuerySchema = z.object({
  year: z.string(),
  month: z.string(),
});
export type GetMyActivityReservationDashboardQuery = z.infer<
  typeof GetMyActivityReservationDashboardQuerySchema
>;

export const MyActivityReservationDashboardItemSchema = z.object({
  date: z.string(),
  reservations: z.object({
    completed: z.number(),
    confirmed: z.number(),
    pending: z.number(),
  }),
});
export type MyActivityReservationDashboardItem = z.infer<
  typeof MyActivityReservationDashboardItemSchema
>;

export const GetMyActivityReservationDashboardResponseSchema = z.array(
  MyActivityReservationDashboardItemSchema
);
export type GetMyActivityReservationDashboardResponse = z.infer<
  typeof GetMyActivityReservationDashboardResponseSchema
>;

// ─── 내 체험 날짜별 예약 스케줄 조회 ────────────────────────────

export const GetMyActivityReservedScheduleQuerySchema = z.object({
  date: z.string(),
});
export type GetMyActivityReservedScheduleQuery = z.infer<
  typeof GetMyActivityReservedScheduleQuerySchema
>;

export const MyActivityReservedScheduleItemSchema = z.object({
  scheduleId: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  count: z.object({
    declined: z.number(),
    confirmed: z.number(),
    pending: z.number(),
  }),
});
export type MyActivityReservedScheduleItem = z.infer<typeof MyActivityReservedScheduleItemSchema>;

export const GetMyActivityReservedScheduleResponseSchema = z.array(
  MyActivityReservedScheduleItemSchema
);
export type GetMyActivityReservedScheduleResponse = z.infer<
  typeof GetMyActivityReservedScheduleResponseSchema
>;

// ─── 내 체험 예약 목록 조회 ─────────────────────────────────────

export const SellerReservationStatusSchema = z.enum(['declined', 'pending', 'confirmed']);
export type SellerReservationStatus = z.infer<typeof SellerReservationStatusSchema>;

export const GetMyActivityReservationsQuerySchema = z.object({
  cursorId: z.number().optional(),
  size: z.number().optional(),
  scheduleId: z.number(),
  status: SellerReservationStatusSchema,
});
export type GetMyActivityReservationsQuery = z.infer<typeof GetMyActivityReservationsQuerySchema>;

export const MyActivityReservationSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  userId: z.number(),
  teamId: z.string(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: SellerReservationStatusSchema,
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type MyActivityReservation = z.infer<typeof MyActivityReservationSchema>;

export const GetMyActivityReservationsResponseSchema = z.object({
  cursorId: z.number().nullable().optional().default(null),
  totalCount: z.number().optional().default(0),
  reservations: z.array(MyActivityReservationSchema).optional().default([]),
});
export type GetMyActivityReservationsResponse = z.infer<
  typeof GetMyActivityReservationsResponseSchema
>;

// ─── 내 체험 예약 상태 업데이트 ─────────────────────────────────

export const UpdateMyActivityReservationStatusRequestBodySchema = z.object({
  status: SellerReservationStatusSchema,
});
export type UpdateMyActivityReservationStatusRequestBody = z.infer<
  typeof UpdateMyActivityReservationStatusRequestBodySchema
>;

export const UpdateMyActivityReservationStatusResponseSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: SellerReservationStatusSchema,
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UpdateMyActivityReservationStatusResponse = z.infer<
  typeof UpdateMyActivityReservationStatusResponseSchema
>;

// ─── 내 체험 삭제 ───────────────────────────────────────────────

export type DeleteMyActivityResponse = undefined;

// ─── 내 체험 수정 ───────────────────────────────────────────────

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
export type UpdateMyActivityRequestBody = z.infer<typeof UpdateMyActivityRequestBodySchema>;

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
  subImages: z.array(
    z.object({
      imageUrl: z.string(),
      id: z.number(),
    })
  ),
  schedules: z.array(
    z.object({
      times: z.array(
        z.object({
          endTime: z.string(),
          startTime: z.string(),
          id: z.number(),
        })
      ),
      date: z.string(),
    })
  ),
});
export type UpdateMyActivityResponse = z.infer<typeof UpdateMyActivityResponseSchema>;
