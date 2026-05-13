'use client';

import type { MyReservation } from '@/features/reservation/types';
import BottomSheet from '@/shared/ui/bottom-sheet/BottomSheet';
import { cn } from '@/shared/utils/cn';
import ReservationChangeContent from './ReservationChangeContent';

type ReservationChangeSheetProps = {
  isOpen: boolean;
  reservation: MyReservation;
  onClose: () => void;
};

/**
 * ## ReservationChangeSheet
 *
 * 모바일에서 사용하는 예약 변경 바텀시트 컨테이너입니다.
 *
 * @remarks
 * - BottomSheet 레이아웃만 담당하고, 실제 콘텐츠는 `ReservationChangeContent`에서 렌더링합니다.
 */
export default function ReservationChangeSheet({
  isOpen,
  reservation,
  onClose,
}: ReservationChangeSheetProps) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="예약 변경"
      surfaceClassName={cn('h-auto! max-h-[90dvh]! px-7.5', 'max-h-none!')}
    >
      <ReservationChangeContent variant="sheet" reservation={reservation} onClose={onClose} />
    </BottomSheet>
  );
}
