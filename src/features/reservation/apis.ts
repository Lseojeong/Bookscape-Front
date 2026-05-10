import type {
  CreateMyReservationReviewRequestBody,
  CreateMyReservationReviewResponse,
  GetMyReservationsQuery,
} from '@/features/reservation/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { GetMyReservationsResponseSchema } from './types';

export const getMyReservations = async (query?: GetMyReservationsQuery) => {
  const data = await bffFetch.get<unknown>('/my-reservations', query);
  if (!data) return null;
  return GetMyReservationsResponseSchema.parse(data);
};

export const createMyReservationReview = async (
  reservationId: number,
  body: CreateMyReservationReviewRequestBody
) => {
  return bffFetch.post<CreateMyReservationReviewResponse>(
    `/my-reservations/${reservationId}/reviews`,
    body
  );
};
