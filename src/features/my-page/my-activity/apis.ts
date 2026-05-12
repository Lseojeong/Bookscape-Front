import {
  GetMyActivitiesQuerySchema,
  GetMyActivitiesResponseSchema,
  type GetMyActivitiesQuery,
  type GetMyActivitiesResponse,
} from '@/features/my-page/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

const EMPTY_MY_ACTIVITIES_RESPONSE: GetMyActivitiesResponse = {
  cursorId: null,
  totalCount: 0,
  activities: [],
};

export const getMyActivities = async (query: GetMyActivitiesQuery = {}) => {
  const safeQuery = GetMyActivitiesQuerySchema.parse(query);
  const result = await bffFetch.get<GetMyActivitiesResponse>('/my-activities', safeQuery);
  if (!result) return EMPTY_MY_ACTIVITIES_RESPONSE;
  return GetMyActivitiesResponseSchema.parse(result);
};

export const deleteActivity = async (id: number) => {
  await bffFetch.delete(`/my-activities/${id}`);
};
