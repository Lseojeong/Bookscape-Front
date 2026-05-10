import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { GetMyNotificationsResponse } from '@/features/notification/types';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';
import { proxyFetch } from '@/shared/apis/bff/proxy';

/**
 * ## 내 알림 리스트 조회 API (BFF)
 *
 * @description
 * 로그인한 사용자의 알림 목록을 조회합니다. (커서 기반 페이지네이션)
 *
 * - Backend: `GET /{teamId}/my-notifications`
 *
 * @query cursorId 커서 ID
 * @query size 페이지 크기 (기본 10)
 *
 * @returns 내 알림 리스트 (`GetMyNotificationsResponse`)
 */
export const GET = createAuthorizedRoute(async ({ request }) => {
  const cookieStore = await cookies();
  const lastSeenRaw = cookieStore.get('notifications_last_seen_at')?.value;
  const lastSeenAtMs = lastSeenRaw ? Number(lastSeenRaw) : null;

  const { search } = new URL(request.url);
  const data = await proxyFetch.get<GetMyNotificationsResponse>(`/my-notifications${search}`);

  const notifications = data?.notifications ?? [];
  const hasNew =
    notifications.length > 0 &&
    notifications.some((n) => {
      const ms = Date.parse(n.updatedAt);
      return Number.isFinite(ms) && (lastSeenAtMs == null || ms > lastSeenAtMs);
    });

  return NextResponse.json({ ...data, hasNew, lastSeenAtMs });
});
