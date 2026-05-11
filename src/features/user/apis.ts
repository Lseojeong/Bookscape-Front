import {
  UpdateMyProfileRequestBody,
  UserMeResponseSchema,
  UserResponseSchema,
  CreateMyProfileImageUrlResponseSchema,
} from '@/features/user/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const getMe = async () => {
  const data = await bffFetch.get('/users/me');
  return data ? UserMeResponseSchema.parse(data) : null;
};

/**
 * 내 정보 수정
 * @description `PATCH /api/users/me`
 */
export const updateMyProfile = async (body: UpdateMyProfileRequestBody) => {
  const data = await bffFetch.patch('/users/me', body);
  return data ? UserResponseSchema.parse(data) : null;
};

/**
 * 프로필 이미지 URL 생성
 * @description `POST /api/users/me/image`
 */
export const createMyProfileImageUrl = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  const data = await bffFetch.post('/users/me/image', formData, {
    isFormData: true,
  });
  return data ? CreateMyProfileImageUrlResponseSchema.parse(data) : null;
};
