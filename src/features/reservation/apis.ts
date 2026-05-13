import type {
  CancelMyReservationRequestBody,
  CreateMyReservationReviewRequestBody,
  GetMyReservationsQuery,
  MyReservationItem,
} from '@/features/reservation/types';
import {
  CreateMyReservationReviewRequestBodySchema,
  CreateMyReservationReviewResponseSchema,
  GetMyReservationsResponseSchema,
} from '@/features/reservation/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

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
