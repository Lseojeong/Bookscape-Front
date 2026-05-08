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

type SignupRequest = Omit<SignupFormValues, 'passwordConfirm'>;

export const signupUser = async (formData: SignupRequest) => {
  return await post('/users', formData);
};
