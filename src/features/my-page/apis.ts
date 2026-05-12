import type {
  CreateActivityRequestBody,
  CreateActivityResponse,
  CreateActivityImageUrlResponse,
  UpdateMyActivityRequestBody,
  UpdateMyActivityResponse,
} from '@/features/my-page/activity-form/types';
import {
  GetMyActivitiesResponseSchema,
  GetMyActivityReservationDashboardResponseSchema,
  GetMyActivityReservedScheduleResponseSchema,
  GetMyActivityReservationsResponseSchema,
  UpdateMyActivityReservationStatusResponseSchema,
} from '@/features/my-page/types';
import type {
  GetMyActivitiesQuery,
  GetMyActivityReservationDashboardQuery,
  GetMyActivityReservationsQuery,
  UpdateMyActivityReservationStatusRequestBody,
} from '@/features/my-page/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';
import { get } from '@/shared/apis/base/publicFetch';

/**
 * 내 체험 리스트 조회
 *
 * @description `GET /api/my-activities`
 * @param query - 커서 ID, 페이지 크기
 * @returns 내 체험 리스트
 */
export const getMyActivities = async (query?: GetMyActivitiesQuery) => {
  const data = await bffFetch.get('/my-activities', query);
  return GetMyActivitiesResponseSchema.parse(
    data ?? { cursorId: 0, totalCount: 0, activities: [] }
  );
};

/**
 * 내 체험 월별 예약 현황 조회
 *
 * @description `GET /api/my-activities/{activityId}/reservation-dashboard`
 * @param activityId - 체험 ID
 * @param query - 조회 연도 및 월 (`year`, `month`)
 * @returns 날짜별 예약 현황 목록
 */
export const getReservationDashboard = async (
  activityId: number,
  query: GetMyActivityReservationDashboardQuery
) => {
  const data = await bffFetch.get(`/my-activities/${activityId}/reservation-dashboard`, query);
  return GetMyActivityReservationDashboardResponseSchema.parse(data ?? []);
};

/**
 * 내 체험 날짜별 예약 정보가 있는 스케줄 조회
 *
 * @description `GET /api/my-activities/{activityId}/reserved-schedule`
 * @param activityId - 체험 ID
 * @param date - 조회 날짜 (`YYYY-MM-DD`)
 * @returns 스케줄 목록
 */
export const getReservedSchedule = async (activityId: number, date: string) => {
  const data = await bffFetch.get(`/my-activities/${activityId}/reserved-schedule`, { date });
  return GetMyActivityReservedScheduleResponseSchema.parse(data ?? []);
};

/**
 * 내 체험 예약 목록 조회
 *
 * @description `GET /api/my-activities/{activityId}/reservations`
 * @param activityId - 체험 ID
 * @param query - 스케줄 ID, 상태, 커서 ID, 페이지 크기
 * @returns 예약 목록
 */
export const getMyActivityReservations = async (
  activityId: number,
  query: GetMyActivityReservationsQuery
) => {
  const data = await bffFetch.get(
    `/my-activities/${activityId}/reservations`,
    query as Record<string, string | number | boolean | undefined>
  );
  return GetMyActivityReservationsResponseSchema.parse(
    data ?? { cursorId: 0, totalCount: 0, reservations: [] }
  );
};

/**
 * 내 체험 예약 상태 업데이트 (승인 / 거절)
 *
 * @description `PATCH /api/my-activities/{activityId}/reservations/{reservationId}`
 * @param activityId - 체험 ID
 * @param reservationId - 예약 ID
 * @param body - 변경할 상태 (`confirmed` | `declined`)
 * @returns 수정된 예약 정보
 */
export const updateReservationStatus = async (
  activityId: number,
  reservationId: number,
  body: UpdateMyActivityReservationStatusRequestBody
) => {
  const data = await bffFetch.patch(
    `/my-activities/${activityId}/reservations/${reservationId}`,
    body
  );
  if (!data) throw new Error('예약 상태 업데이트 실패');
  return UpdateMyActivityReservationStatusResponseSchema.parse(data);
};

/**
 * 체험 등록
 *
 * @description `POST /activities`
 * @param data - 체험 등록에 필요한 폼 데이터
 * @returns 등록 완료된 체험 정보
 */
export const createActivity = async (data: CreateActivityRequestBody) => {
  return await bffFetch.post<CreateActivityResponse>('/activities', data);
};

/**
 * 체험 이미지 업로드
 *
 * @description `POST /activities/image`
 * @param formData - 업로드할 이미지 파일이 포함된 FormData 객체
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (formData: FormData) => {
  return await bffFetch.postFormData<CreateActivityImageUrlResponse>('/activities/image', formData);
};

/** 체험 상세 조회 API */
export const fetchActivityDetail = async (id: number) => {
  const res = await get<CreateActivityResponse>(`/activities/${id}`);
  if (!res) throw new Error('체험 상세 정보를 불러오지 못했습니다.');
  return res;
};

/** 내 체험 수정 API */
export const updateMyActivity = async (id: number, data: UpdateMyActivityRequestBody) => {
  const res = await bffFetch.patch<UpdateMyActivityResponse>(`/my-activities/${id}`, data);
  if (!res) throw new Error('체험 수정에 실패했습니다.');
  return res;
};
