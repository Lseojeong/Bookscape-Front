/** 사용자 기본 정보 타입 */
type User = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

/** POST /auth/login 응답  */
export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
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
