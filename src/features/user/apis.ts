import type {
  UpdateMyProfileRequestBody,
  CreateMyProfileImageUrlResponse,
} from '@/features/user/types';
import { UserMeResponseSchema } from '@/features/user/types';
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
  return bffFetch.patch('/users/me', body);
};

/**
 * 프로필 이미지 URL 생성
 * @description `POST /api/users/me/image`
 */
export const createMyProfileImageUrl = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);
  return bffFetch.post<CreateMyProfileImageUrlResponse>('/users/me/image', formData, {
    isFormData: true,
  });
};
