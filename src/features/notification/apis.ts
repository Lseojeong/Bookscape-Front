import {
  GetMyNotificationsResponseSchema,
  GetMyNotificationsQuerySchema,
  type GetMyNotificationsQuery,
  type ParsedNotification,
  parseNotificationContent,
} from '@/features/notification/types';
import { bffFetch } from '@/shared/apis/base/bffFetch';

const toParsedNotification = (n: {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}): ParsedNotification => {
  const parsed = parseNotificationContent(n.content);
  if (parsed) {
    return {
      id: n.id,
      title: parsed.title,
      date: parsed.date,
      updatedAt: n.updatedAt,
      status: parsed.status,
    };
  }

  return {
    id: n.id,
    title: n.content,
    date: n.createdAt,
    updatedAt: n.updatedAt,
    status: 'confirmed',
  };
};

export const getMyNotifications = async (query?: GetMyNotificationsQuery) => {
  const safeQuery = query ? GetMyNotificationsQuerySchema.parse(query) : undefined;
  const data = await bffFetch.get<unknown>('/my-notifications', safeQuery);
  if (!data) return null;
  const parsed = GetMyNotificationsResponseSchema.parse(data);

  return {
    ...parsed,
    notifications: parsed.notifications.map(toParsedNotification),
  };
};

export const deleteMyNotification = async (notificationId: number) => {
  await bffFetch.delete(`/my-notifications/${notificationId}`);
};
