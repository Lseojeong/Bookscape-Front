import { LoginFormValues, SignupFormValues } from '@/features/auth/utils/schema';
import { UserResponse } from '@/features/user/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const loginUser = async (formData: LoginFormValues) => {
  return await bffFetch.post<{ success: boolean; user: UserResponse; expiresAt: number }>(
    '/auth/login',
    formData
  );
};

export const signupUser = async (formData: SignupFormValues) => {
  return await bffFetch.post<{ success: boolean }>('/auth/signup', formData);
};
