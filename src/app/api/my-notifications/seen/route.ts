import { NextResponse } from 'next/server';
import { createAuthorizedRoute } from '@/shared/apis/bff/createAuthorizedRoute';

/**
 * ## 내 알림 확인 처리 (BFF)
 *
 * @description
 * 알림 모달을 열어 사용자가 알림을 확인했음을 기록합니다.
 * - 저장소 없이 쿠키(`notifications_last_seen_at`)에 마지막 확인 시각(ms)을 저장합니다.
 */
export const POST = createAuthorizedRoute(async () => {
  const res = new NextResponse(null, { status: 204 });
  // 180일 유지
  res.cookies.set('notifications_last_seen_at', String(Date.now()), {
    path: '/',
    maxAge: 60 * 60 * 24 * 180,
    sameSite: 'lax',
  });
  return res;
});
