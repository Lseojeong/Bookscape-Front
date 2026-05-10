import { z } from 'zod';

export const UserResponseSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

/** POST /auth/login 응답 */
export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: UserResponseSchema,
});

/** POST /auth/tokens 응답 */
export const RefreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

/** POST /users 요청 */
export const SignupRequestScheme = z.object({
  email: z.string().email(),
  nickname: z.string(),
  password: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
export type SignupRequestBody = z.infer<typeof SignupRequestScheme>;
