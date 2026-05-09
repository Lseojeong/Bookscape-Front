import { z } from 'zod';

export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

export const UserMeResponseSchema = UserResponseSchema.extend({
  loginMethod: z.enum(['auth', 'oauth']).nullable(),
});

/**
 * ## UserMeResponse
 *
 * @description
 * BFF `GET /users/me` 응답 타입입니다.
 * 기본 사용자 정보(`UserResponse`)에 로그인 방식(`loginMethod`)을 추가로 포함합니다.
 */
export type UserMeResponse = z.infer<typeof UserMeResponseSchema>;

export const UpdateMyProfileRequestBodySchema = z.object({
  nickname: z.string().optional(),
  profileImageUrl: z.string().optional(),
  newPassword: z.string().optional(),
});

export type UpdateMyProfileRequestBody = z.infer<typeof UpdateMyProfileRequestBodySchema>;

export const CreateMyProfileImageUrlResponseSchema = z.object({
  profileImageUrl: z.string(),
});

export type CreateMyProfileImageUrlResponse = z.infer<typeof CreateMyProfileImageUrlResponseSchema>;
