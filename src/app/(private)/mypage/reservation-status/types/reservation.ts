import { z } from 'zod';

export const ReservationStatusSchema = z.enum(['pending', 'confirmed', 'declined']);

export const CalendarReservationCountSchema = z.object({
  completed: z.number(),
  confirmed: z.number(),
  pending: z.number(),
});

export const ScheduleReservationCountSchema = z.object({
  declined: z.number(),
  confirmed: z.number(),
  pending: z.number(),
});

export const CalendarScheduleSchema = z.object({
  date: z.string(),
  reservations: CalendarReservationCountSchema,
});

export const ScheduleSchema = z.object({
  scheduleId: z.number(),
  startTime: z.string(),
  endTime: z.string(),
  count: ScheduleReservationCountSchema,
});

export const ReservationSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  userId: z.number(),
  teamId: z.string(),
  activityId: z.number(),
  scheduleId: z.number(),
  status: ReservationStatusSchema,
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const GetReservationsResponseSchema = z.object({
  cursorId: z.number(),
  totalCount: z.number(),
  reservations: z.array(ReservationSchema),
});

export const UpdateReservationStatusRequestSchema = z.object({
  status: z.enum(['confirmed', 'declined']),
});

export type ReservationStatus = z.infer<typeof ReservationStatusSchema>;
export type CalendarSchedule = z.infer<typeof CalendarScheduleSchema>;
export type Schedule = z.infer<typeof ScheduleSchema>;
export type Reservation = z.infer<typeof ReservationSchema>;
export type GetReservationsResponse = z.infer<typeof GetReservationsResponseSchema>;
export type UpdateReservationStatusRequest = z.infer<typeof UpdateReservationStatusRequestSchema>;
