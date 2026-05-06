import { ActivityResponse } from '@/features/activity/types';
import { get } from '@/shared/apis/base/publicFetch';

// TODO : 다은님 코드랑 충돌 날 수 있어서 머지 전에 확인 필요함
export const getHotActivityData = async (size: number) => {
  const result = await get<ActivityResponse>(
    `/activities?method=offset&sort=most_reviewed&size=${size}`
  );
  return result?.activities ?? [];
};
