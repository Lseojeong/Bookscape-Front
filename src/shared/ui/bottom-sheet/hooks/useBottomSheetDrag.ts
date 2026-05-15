import { useRef, useState } from 'react';

type UseBottomSheetDragProps = {
  onClose: () => void;
  threshold?: number;
};

export default function useBottomSheetDrag({ onClose, threshold = 100 }: UseBottomSheetDragProps) {
  const startYRef = useRef(0);
  const [dragY, setDragY] = useState(0);

  const resetDrag = () => {
    setDragY(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = e.touches[0].clientY - startYRef.current;

    if (diff > 0) {
      setDragY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (dragY > threshold) {
      resetDrag();
      onClose();
      return;
    }

    resetDrag();
  };

  return {
    dragY,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
