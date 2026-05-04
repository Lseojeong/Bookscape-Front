export type ReservationStatus = 'pending' | 'confirmed' | 'declined';

export type CalendarSchedule = {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

export type Schedule = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
};

export type Reservation = {
  id: number;
  nickname: string; // 추가
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

// 예약 목록 API 응답
export type GetReservationsResponse = {
  cursorId: number;
  totalCount: number;
  reservations: Reservation[];
};

export type UpdateReservationStatusRequest = {
  status: 'confirmed' | 'declined';
};
