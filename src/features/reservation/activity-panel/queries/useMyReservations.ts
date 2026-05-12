import { useQuery } from '@tanstack/react-query';
import { getMyReservations } from '@/features/reservation/apis';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';

export const useMyReservations = () => {
  const { user } = useUserStore();

  return useQuery({
    queryKey: QUERY_KEYS.MY_RESERVATIONS(undefined, 100),
    queryFn: () => getMyReservations({ size: 100 }),
    enabled: !!user,
  });
};
