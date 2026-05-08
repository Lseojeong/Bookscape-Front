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
