import type { GetMyActivityReservedScheduleResponse } from '@/features/my-page/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';
import { requireParams } from '@/shared/apis/bff/requireParams';

/**
 * ## 내 체험 날짜별 예약 정보가 있는 스케줄 조회 API (BFF)
 *
 * @description
 * 특정 날짜에 예약 정보(신청/승인/거절)가 있는 스케줄 목록을 조회합니다.
 *
 * - Backend: `GET /{teamId}/my-activities/{activityId}/reserved-schedule`
 *
 * @query date YYYY-MM-DD
 *
 * @returns 스케줄 목록 (`GetMyActivityReservedScheduleResponse`)
 */
export const GET = createAuthorizedRoute<unknown, { activityId: string }>(
  async ({ request, params }) => {
    const { activityId } = requireParams(params);
    const { search } = new URL(request.url);
    return proxyFetch.get<GetMyActivityReservedScheduleResponse>(
      `/my-activities/${activityId}/reserved-schedule${search}`
    );
  }
);
