import type { InfiniteData } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMyReservationReview } from '@/features/reservation/apis';
import type {
  CreateMyReservationReviewRequestBody,
  GetMyReservationsResponse,
} from '@/features/reservation/types';

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
      queryClient.setQueriesData<InfiniteData<GetMyReservationsResponse>>(
        { queryKey: ['my-reservations'] },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              reservations: page.reservations.map((r) =>
                r.id === reservationId ? { ...r, reviewSubmitted: true } : r
              ),
            })),
          };
        }
      );
    },
  });
};
