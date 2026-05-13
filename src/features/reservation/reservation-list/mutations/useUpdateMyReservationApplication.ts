'use client';

import type { InfiniteData, QueryKey } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyReservationApplication } from '@/features/reservation/apis';
import type {
  GetMyReservationsResponse,
  UpdateMyReservationApplicationRequestBody,
} from '@/features/reservation/types';

type UpdateMyReservationApplicationVariables = {
  reservationId: number;
  body: UpdateMyReservationApplicationRequestBody;
  optimistic?: {
    date?: string;
    startTime?: string;
    endTime?: string;
  };
};

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

export const useUpdateMyReservationApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, body }: UpdateMyReservationApplicationVariables) =>
      updateMyReservationApplication(reservationId, body),
    onMutate: async ({ reservationId, body, optimistic }) => {
      await queryClient.cancelQueries({ queryKey: ['my-reservations'] });

      const previousQueries = queryClient.getQueriesData({ queryKey: ['my-reservations'] });

      queryClient.setQueriesData({ queryKey: ['my-reservations'] }, (old) => {
        if (!old) return old;

        // `my-reservations` may be cached either as an infinite query (with `pages`)
        // or as a single page result (with `reservations`).
        if (hasPages(old)) {
          const infinite = old;
          const nextPages = infinite.pages.map((page) => ({
            ...page,
            reservations: page.reservations.map((r) =>
              r.id === reservationId
                ? {
                    ...r,
                    scheduleId: body.scheduleId,
                    headCount: body.headCount,
                    ...(optimistic?.date ? { date: optimistic.date } : null),
                    ...(optimistic?.startTime ? { startTime: optimistic.startTime } : null),
                    ...(optimistic?.endTime ? { endTime: optimistic.endTime } : null),
                  }
                : r
            ),
          }));

          return { ...infinite, pages: nextPages };
        }

        if (hasReservations(old)) {
          const page = old;
          return {
            ...page,
            reservations: page.reservations.map((r) =>
              r.id === reservationId
                ? {
                    ...r,
                    scheduleId: body.scheduleId,
                    headCount: body.headCount,
                    ...(optimistic?.date ? { date: optimistic.date } : null),
                    ...(optimistic?.startTime ? { startTime: optimistic.startTime } : null),
                    ...(optimistic?.endTime ? { endTime: optimistic.endTime } : null),
                  }
                : r
            ),
          };
        }

        return old;
      });

      return { previousQueries };
    },
    onError: (_error, _variables, context) => {
      context?.previousQueries?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey as QueryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['my-reservations'] });
    },
  });
};
