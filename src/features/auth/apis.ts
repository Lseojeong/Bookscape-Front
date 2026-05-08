import { LoginFormValues, SignupFormValues } from '@/features/auth/utils/schema';
import { UserResponse } from '@/features/user/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { post } from '@/shared/apis/base/publicFetch';

export const loginUser = async (formData: LoginFormValues) => {
  return await bffFetch.post<{ success: boolean; user: UserResponse; expiresAt: number }>(
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

export const signupUser = async (formData: Omit<SignupFormValues, 'passwordConfirm'>) => {
  return await post('/users', formData);
};
