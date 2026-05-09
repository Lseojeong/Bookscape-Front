export type GetMyNotificationsQuery = {
  cursorId?: number;
  size?: number;
};

export type MyNotification = {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type GetMyNotificationsResponse = {
  cursorId: number;
  notifications: MyNotification[];
  totalCount: number;
};
