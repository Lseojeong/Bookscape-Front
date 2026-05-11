import { useMutation } from '@tanstack/react-query';
import type {
  CreateActivityRequestBody,
  CreateActivityResponse,
} from '@/features/my-page/activity-form/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

export const useCreateActivity = () => {
  return useMutation({
    mutationFn: async (data: CreateActivityRequestBody) => {
      const res = await bffFetch.post<CreateActivityResponse>('/activities', data);

      if (!res) {
        throw new Error('체험 등록 응답이 없습니다.');
      }

      return res;
    },
  });
};
