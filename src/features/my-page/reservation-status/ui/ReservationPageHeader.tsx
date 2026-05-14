'use client';

import PageHeader from '@/shared/ui/page-header/PageHeader';

/**
 * 뒤로가기 기능이 포함된 예약 현황 페이지 헤더 컴포넌트.
 *
 * - `useRouter`를 사용하므로 클라이언트 컴포넌트로 분리합니다.
 */
export default function ReservationPageHeader() {
  return (
    <PageHeader
      title="예약 현황"
      description="내 체험에 예약된 내역들을 한 눈에 확인할 수 있습니다."
    />
  );
}
