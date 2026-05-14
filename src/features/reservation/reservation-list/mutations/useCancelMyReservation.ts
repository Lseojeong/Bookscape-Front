'use client';

import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelMyReservation } from '@/features/reservation/apis';
import type { GetMyReservationsResponse } from '@/features/reservation/types';

const hasPages = (
  value: unknown
): value is InfiniteData<GetMyReservationsResponse, number | undefined> => {
  if (!value || typeof value !== 'object') return false;
  return Array.isArray((value as { pages?: unknown }).pages);
};

const hasReservations = (value: unknown): value is GetMyReservationsResponse => {
  if (!value || typeof value !== 'object') return false;
  return Array.isArray((value as { reservations?: unknown }).reservations);
};

export const useCancelMyReservation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) => cancelMyReservation(reservationId),
    onMutate: async (reservationId) => {
      await queryClient.cancelQueries({ queryKey: ['my-reservations'] });

      const previousQueries = queryClient.getQueriesData({ queryKey: ['my-reservations'] });

      queryClient.setQueriesData({ queryKey: ['my-reservations'] }, (old) => {
        if (!old) return old;

        if (hasPages(old)) {
          const infinite = old;
          const nextPages = infinite.pages.map((page) => ({
            ...page,
            reservations: page.reservations.map((r) =>
              r.id === reservationId ? { ...r, status: 'canceled' as const } : r
            ),
          }));

          return { ...infinite, pages: nextPages };
        }

        if (hasReservations(old)) {
          const page = old;
          return {
            ...page,
            reservations: page.reservations.map((r) =>
              r.id === reservationId ? { ...r, status: 'canceled' as const } : r
            ),
          };
        }

        return old;
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
