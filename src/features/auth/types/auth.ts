import { UserResponse } from '@/features/user/types';

/** POST /auth/login 응답  */
export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
};

/** POST /auth/login 리퀘스트 */
export type LoginRequest = {
  email: string;
  password: string;
};

/** POST /auth/tokens 응답  */
export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};
