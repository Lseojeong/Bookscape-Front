import { UserMeResponseSchema } from '@/features/user/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const getMe = async () => {
  const data = await bffFetch.get('/users/me');
  return data ? UserMeResponseSchema.parse(data) : null;
};
