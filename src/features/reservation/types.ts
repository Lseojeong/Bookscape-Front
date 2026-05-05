export type MyReservationStatus = 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';

export type GetMyReservationsQuery = {
  cursorId?: number;
  size?: number;
  status?: MyReservationStatus;
};

export type MyReservationActivitySummary = {
  bannerImageUrl: string;
  title: string;
  id: number;
};

export type MyReservation = {
  id: number;
  teamId: string;
  userId: number;
  activity: MyReservationActivitySummary;
  scheduleId: number;
  status: MyReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type GetMyReservationsResponse = {
  cursorId: number;
  reservations: MyReservation[];
  totalCount: number;
};

export type CancelMyReservationRequestBody = {
  status: 'canceled';
};

export type UpdateMyReservationApplicationRequestBody = {
  scheduleId: number;
  headCount: number;
};

export type MyReservationItem = {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: MyReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateMyReservationReviewRequestBody = {
  rating: number;
  content: string;
};

export type CreateMyReservationReviewResponse = {
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
};
