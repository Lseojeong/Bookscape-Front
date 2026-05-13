'use client';

import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelMyReservation } from '@/features/reservation/apis';
import type { GetMyReservationsResponse } from '@/features/reservation/types';

export const useCancelMyReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) => cancelMyReservation(reservationId),
    onMutate: async (reservationId) => {
      await queryClient.cancelQueries({ queryKey: ['my-reservations'] });

      const previousQueries = queryClient.getQueriesData<
        InfiniteData<GetMyReservationsResponse, number | undefined>
      >({ queryKey: ['my-reservations'] });

      queryClient.setQueriesData<
        InfiniteData<GetMyReservationsResponse, number | undefined> | undefined
      >({ queryKey: ['my-reservations'] }, (old) => {
        if (!old) return old;

        const nextPages = old.pages.map((page) => ({
          ...page,
          reservations: page.reservations.map((r) =>
            r.id === reservationId ? { ...r, status: 'canceled' as const } : r
          ),
        }));

        return { ...old, pages: nextPages };
      });

      return { previousQueries };
    },
    onError: (_error, _reservationId, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey as QueryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['my-reservations'] });
    },
  });
};
