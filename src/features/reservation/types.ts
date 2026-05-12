import { z } from 'zod';

export const MyReservationStatusSchema = z.enum([
  'pending',
  'confirmed',
  'declined',
  'canceled',
  'completed',
]);

export type MyReservationStatus = z.infer<typeof MyReservationStatusSchema>;

export type GetMyReservationsQuery = {
  cursorId?: number;
  size?: number;
  status?: MyReservationStatus;
};

export const MyReservationActivitySummarySchema = z.object({
  bannerImageUrl: z.string(),
  title: z.string(),
  id: z.number(),
});

export type MyReservationActivitySummary = z.infer<typeof MyReservationActivitySummarySchema>;

export const MyReservationSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activity: MyReservationActivitySummarySchema,
  scheduleId: z.number(),
  status: MyReservationStatusSchema,
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type MyReservation = z.infer<typeof MyReservationSchema>;

export const GetMyReservationsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  reservations: z.array(MyReservationSchema),
  totalCount: z.number(),
});

export type GetMyReservationsResponse = z.infer<typeof GetMyReservationsResponseSchema>;

export type CancelMyReservationRequestBody = {
  status: 'canceled';
};

export type UpdateMyReservationApplicationRequestBody = {
  scheduleId: number;
  headCount: number;
};

export type MyReservationItem = {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: MyReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateMyReservationReviewRequestBody = {
  rating: number;
  content: string;
};

export const CreateMyReservationReviewRequestBodySchema = z.object({
  rating: z.number(),
  content: z.string(),
});

export type CreateMyReservationReviewResponse = {
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
};

export const CreateMyReservationReviewResponseSchema = z.object({
  updatedAt: z.string(),
  createdAt: z.string(),
  content: z.string(),
  rating: z.number(),
  userId: z.number(),
  activityId: z.number(),
  teamId: z.string(),
  id: z.number(),
});

export type CreateActivityReservationRequestBody = {
  scheduleId: number;
  headCount: number;
};
