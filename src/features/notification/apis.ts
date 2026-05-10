import { z } from 'zod';
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

  // 백엔드에서 content가 평문으로 내려오는 케이스 대응
  // 예: "스트릿댄스(2027-12-05 14:00~15:00) 예약이 거절되었습니다."
  const match = /^(.+)\((.+)\)\s*예약이\s*(승인|거절)되었습니다\./.exec(n.content);
  if (match?.[1] && match[2] && match[3]) {
    return {
      id: n.id,
      title: match[1],
      date: match[2],
      updatedAt: n.updatedAt,
      status: match[3] === '거절' ? 'declined' : 'confirmed',
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

const GetMyNotificationsBffResponseSchema = GetMyNotificationsResponseSchema.extend({
  hasNew: z.boolean().optional(),
  lastSeenAtMs: z.number().nullable().optional(),
});

export const getMyNotifications = async (query?: GetMyNotificationsQuery) => {
  const safeQuery = query ? GetMyNotificationsQuerySchema.parse(query) : undefined;
  const data = await bffFetch.get<unknown>('/my-notifications', safeQuery);
  if (!data) return null;
  const parsed = GetMyNotificationsBffResponseSchema.parse(data);

  return {
    ...parsed,
    notifications: parsed.notifications.map(toParsedNotification),
  };
};

export const deleteMyNotification = async (notificationId: number) => {
  await bffFetch.delete(`/my-notifications/${notificationId}`);
};

export const markMyNotificationsSeen = async () => {
  await bffFetch.post('/my-notifications/seen', undefined);
};
