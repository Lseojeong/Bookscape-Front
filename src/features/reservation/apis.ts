import { z } from 'zod';
import { ActivityScheduleSchema } from '@/features/activity/types';
import type {
  CancelMyReservationRequestBody,
  CreateActivityReservationRequestBody,
  CreateMyReservationReviewRequestBody,
  GetMyReservationsQuery,
  MyReservationItem,
  UpdateMyReservationApplicationRequestBody,
} from '@/features/reservation/types';
import {
  CreateMyReservationReviewRequestBodySchema,
  CreateMyReservationReviewResponseSchema,
  GetMyReservationsResponseSchema,
} from '@/features/reservation/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { get } from '@/shared/apis/base/publicFetch';

export const getMyReservations = async (query?: GetMyReservationsQuery) => {
  const data = await bffFetch.get<unknown>('/my-reservations', query);
  if (!data) return null;
  return GetMyReservationsResponseSchema.parse(data);
};

export const cancelMyReservation = async (reservationId: number) => {
  const body: CancelMyReservationRequestBody = { status: 'canceled' };
  const data = await bffFetch.patch<MyReservationItem>(`/my-reservations/${reservationId}`, body);
  if (!data) throw new Error('예약 취소에 실패했습니다.');
  return data;
};

export const updateMyReservationApplication = async (
  reservationId: number,
  body: UpdateMyReservationApplicationRequestBody
) => {
  const data = await bffFetch.patch<MyReservationItem>(
    `/my-reservations/${reservationId}/application`,
    body
  );
  if (!data) throw new Error('예약 변경에 실패했습니다.');
  return data;
};

export const createMyReservationReview = async (
  reservationId: number,
  body: CreateMyReservationReviewRequestBody
) => {
  const safeBody = CreateMyReservationReviewRequestBodySchema.parse(body);
  const result = await bffFetch.post<unknown>(
    `/my-reservations/${reservationId}/reviews`,
    safeBody
  );
  if (!result) return null;
  return CreateMyReservationReviewResponseSchema.parse(result);
};

/** 예약 가능일 조회 */
export const getAvailableSchedule = async (activityId: number, year: string, month: string) => {
  const data = await get(
    `/activities/${activityId}/available-schedule?year=${year}&month=${month}`
  );
  return z.array(ActivityScheduleSchema).parse(data);
};

export const createReservation = async (
  activityId: number,
  body: CreateActivityReservationRequestBody
) => {
  return bffFetch.post(`/activities/${activityId}/reservations`, body);
};
