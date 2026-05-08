import type { UserResponse } from '@/features/user/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const getMe = async () => {
  return bffFetch.get<UserResponse>('/users/me');
};
