'use client';

import useIsMobile from '@/features/my-page/reservation-status/hooks/useIsMobile';
import ReservationPanelContent from '@/features/my-page/reservation-status/ui/pannel/ReservationPanelContent';
import type { MyActivityReservedScheduleItem } from '@/features/my-page/types';
import BottomSheet from '@/shared/ui/bottom-sheet/BottomSheet';
import useBodyScrollLock from '@/shared/ui/overlay/hooks/useBodyScrollLock';
import useEscapeKey from '@/shared/ui/overlay/hooks/useEscapeKey';
import OverlayLayer from '@/shared/ui/overlay/layer/OverlayLayer';

type ReservationPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  activityId: number | null;
  schedules: MyActivityReservedScheduleItem[];
  isSchedulesLoading: boolean;
};

/**
 * 특정 날짜의 예약 목록을 슬라이드 패널로 표시하는 컴포넌트
 *
 * @description
 * - 모바일: 화면 하단에서 올라오는 바텀 시트
 * - 데스크톱: 화면 우측에서 밀려오는 사이드 패널
 * - 패널이 열린 동안 body 스크롤이 잠기며, Esc 키로 닫을 수 있습니다.
 * - `date`가 `null`이면 아무것도 렌더링하지 않습니다.
 *
 * @param isOpen - 패널 열림 여부
 * @param onClose - 패널 닫기 핸들러
 * @param date - 선택된 날짜
 * @param activityId - 선택된 체험 ID
 * @param schedules - 날짜별 스케줄 목록
 */
export default function ReservationPanel({
  isOpen,
  onClose,
  date,
  activityId,
  schedules,
  isSchedulesLoading,
}: ReservationPanelProps) {
  const isMobile = useIsMobile();

  useBodyScrollLock({ isLocked: isOpen });
  useEscapeKey({ isEnabled: isOpen, onEscape: onClose });

  if (!date) return null;

  const content = (
    <ReservationPanelContent
      date={date}
      activityId={activityId}
      schedules={schedules}
      isSchedulesLoading={isSchedulesLoading}
      onClose={onClose}
    />
  );

  // 모바일: BottomSheet
  if (isMobile) {
    return (
      <BottomSheet isOpen={isOpen} onClose={onClose} ariaLabel="예약 현황">
        <div className="px-6 pt-2 pb-7.5">{content}</div>
      </BottomSheet>
    );
  }

  return (
    <OverlayLayer
      isOpen={isOpen}
      onClose={onClose}
      position="right"
      variant="panel"
      elevation="card"
      ariaLabel="예약 현황 패널"
      contentClassName="h-full"
    >
      {content}
    </OverlayLayer>
  );
}
