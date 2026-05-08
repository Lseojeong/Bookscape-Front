import { bffFetch } from '@/shared/apis/base/bffFetch';
import { GetMyReservationsResponseSchema } from './types';
import type { GetMyReservationsQuery, GetMyReservationsResponse } from './types';

export const getMyReservations = async (query?: GetMyReservationsQuery) => {
  const data = await bffFetch.get<unknown>('/my-reservations', query);
  if (!data) return null;
  return GetMyReservationsResponseSchema.parse(data) as GetMyReservationsResponse;
};
