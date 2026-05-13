import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMyReservationReview } from '@/features/reservation/apis';
import type {
  CreateMyReservationReviewRequestBody,
  GetMyReservationsResponse,
} from '@/features/reservation/types';

const hasPages = (value: unknown): value is InfiniteData<GetMyReservationsResponse> => {
  if (!value || typeof value !== 'object') return false;
  return Array.isArray((value as { pages?: unknown }).pages);
};

const hasReservations = (value: unknown): value is GetMyReservationsResponse => {
  if (!value || typeof value !== 'object') return false;
  return Array.isArray((value as { reservations?: unknown }).reservations);
};

type MutationVars = {
  reservationId: number;
  body: CreateMyReservationReviewRequestBody;
};

export const useCreateMyReservationReviewMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, body }: MutationVars) =>
      createMyReservationReview(reservationId, body),

    onSuccess: (_data, { reservationId }) => {
      queryClient.setQueriesData({ queryKey: ['my-reservations'] }, (old) => {
        if (!old) return old;

        if (hasPages(old)) {
          const infinite = old;
          return {
            ...infinite,
            pages: infinite.pages.map((page) => ({
              ...page,
              reservations: page.reservations.map((r) =>
                r.id === reservationId ? { ...r, reviewSubmitted: true } : r
              ),
            })),
          };
        }

        if (hasReservations(old)) {
          const page = old;
          return {
            ...page,
            reservations: page.reservations.map((r) =>
              r.id === reservationId ? { ...r, reviewSubmitted: true } : r
            ),
          };
        }

        return old;
      });
    },
  });
};
