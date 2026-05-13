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
