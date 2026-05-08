import { UserResponseSchema } from '@/features/user/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const getMe = async () => {
  const data = await bffFetch.get('/users/me');
  return data ? UserResponseSchema.parse(data) : null;
};
