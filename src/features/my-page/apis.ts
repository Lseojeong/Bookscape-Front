import type {
  CreateActivityRequestBody,
  CreateActivityResponse,
  CreateActivityImageUrlResponse,
} from '@/features/my-page/activity-form/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const createActivity = async (data: CreateActivityRequestBody) => {
  return await bffFetch.post<CreateActivityResponse>('/activities', data);
};

export const uploadImage = async (formData: FormData) => {
  return await bffFetch.postFormData<CreateActivityImageUrlResponse>('/activities/image', formData);
};
