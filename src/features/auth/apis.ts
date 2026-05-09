import type { LoginFormValues } from '@/features/auth/utils/schema';
import { UserResponse } from '@/features/user/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const loginUser = async (formData: LoginFormValues) => {
  return bffFetch.post<{ success: boolean; user: UserResponse; accessTokenExpiresAt: number }>(
    '/auth/login',
    formData
  );
};

export const logoutUser = async () => {
  return bffFetch.post<{ success: boolean }>('/auth/logout');
};

export const refreshAuthTokens = async () => {
  return bffFetch.post<{ success: boolean; accessTokenExpiresAt: number }>('/auth/tokens');
};
