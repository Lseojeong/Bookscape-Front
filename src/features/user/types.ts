export type UserResponse = {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * ## UserMeResponse
 *
 * @description
 * BFF `GET /users/me` 응답 타입입니다.
 * 기본 사용자 정보(`UserResponse`)에 로그인 방식(`loginMethod`)을 추가로 포함합니다.
 */
export type UserMeResponse = UserResponse & {
  loginMethod: 'auth' | 'oauth' | null;
};

export type UpdateMyProfileRequestBody = {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
};

export type CreateMyProfileImageUrlResponse = {
  profileImageUrl: string;
};
