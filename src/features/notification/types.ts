import { z } from 'zod';

export const GetMyNotificationsQuerySchema = z.object({
  cursorId: z.number().optional(),
  size: z.number().optional(),
});

export type GetMyNotificationsQuery = z.infer<typeof GetMyNotificationsQuerySchema>;

export const MyNotificationSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
});

export type MyNotification = z.infer<typeof MyNotificationSchema>;

export const GetMyNotificationsResponseSchema = z.object({
  cursorId: z.number().nullable(),
  notifications: z.array(MyNotificationSchema),
  totalCount: z.number(),
});

export type GetMyNotificationsResponse = z.infer<typeof GetMyNotificationsResponseSchema>;

/**
 * BFF(`/api/my-notifications`)에서 내려주는 UI용 응답 타입입니다.
 * - `notifications`는 content를 파싱해 `ParsedNotification`으로 변환됩니다.
 * - `hasNew`, `lastSeenAtMs` 정보가 포함될 수 있습니다.
 */
export type GetMyNotificationsParsedResponse = Omit<GetMyNotificationsResponse, 'notifications'> & {
  notifications: ParsedNotification[];
  hasNew?: boolean;
  lastSeenAtMs?: number | null;
};

/**
 * UI에서 사용하는 파싱된 알림 타입입니다.
 * (백엔드 응답을 그대로 쓰기 어렵기 때문에 content를 기반으로 매핑합니다.)
 */
export const ParsedNotificationSchema = z.object({
  id: z.number(),
  title: z.string(),
  date: z.string(),
  updatedAt: z.string(),
  status: z.enum(['confirmed', 'declined']),
});

export type ParsedNotification = z.infer<typeof ParsedNotificationSchema>;

const ParsedNotificationContentSchema = z.object({
  title: z.string(),
  date: z.string(),
  status: z.enum(['confirmed', 'declined']),
});

export const parseNotificationContent = (content: string) => {
  const json = z
    .string()
    .transform((value, ctx) => {
      try {
        return JSON.parse(value);
      } catch {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid JSON' });
        return z.NEVER;
      }
    })
    .pipe(ParsedNotificationContentSchema);

  const result = json.safeParse(content);
  return result.success ? result.data : null;
};
