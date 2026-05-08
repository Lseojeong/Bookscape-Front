'use client';

import { useState } from 'react';
import ReservationCalendar from './ReservationCalendar';

export default function ReservationWidget() {
  const [selected, setSelected] = useState<Date>();

  return (
    <div className="rounded-3xl border border-gray-50 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
      <ReservationCalendar selected={selected} onSelect={setSelected} />
    </div>
  );
}
