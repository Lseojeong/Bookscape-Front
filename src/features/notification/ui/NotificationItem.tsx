import type { ParsedNotification } from '@/features/notification/types';
import { getTimeAgo } from '@/features/notification/utils/getTimeAgo';
import { DeleteIcon } from '@/shared/assets/icons';

/**
 * NotificationItem 컴포넌트에서 사용하는 props
 */
export type NotificationItemProps = ParsedNotification & {
  /** 해당 알림을 삭제할 때 호출되는 콜백 */
  onDelete: (id: number) => void;
  /** 마지막으로 알림을 확인한 시각(ms). 주어지면 이 값을 기준으로 '새로운 알림'을 판단합니다. */
  lastSeenAtMs?: number | null;
};

const NOTIFICATION_STATUS_OPTIONS = {
  confirmed: {
    label: '승인',
    color: 'text-primary-500',
  },
  declined: {
    label: '거절',
    color: 'text-red-500',
  },
} as const;

export type NotificationStatus = keyof typeof NOTIFICATION_STATUS_OPTIONS;

/**
 * 단일 알림 아이템을 표시하는 컴포넌트입니다.
 *
 * @remarks
 * - 알림 상태(승인/거절)에 따른 텍스트 및 색상을 표시합니다.
 * - 알림 발생 시간을 표시합니다.
 * - 개별 알림 삭제 버튼을 제공합니다.
 *
 * @param props - 컴포넌트 속성
 * @param props.onDelete - 상위 컴포넌트에서 주입받은 개별 알림 삭제 처리 함수
 * @returns 알림 아이템 리스트 요소
 */
export default function NotificationItem({
  id,
  title,
  date,
  updatedAt,
  status,
  onDelete,
  lastSeenAtMs,
}: NotificationItemProps) {
  const { label, color } =
    NOTIFICATION_STATUS_OPTIONS[status as keyof typeof NOTIFICATION_STATUS_OPTIONS];

  const updatedAtMs = Date.parse(updatedAt);
  const isNew =
    Number.isFinite(updatedAtMs) && (lastSeenAtMs == null || updatedAtMs > lastSeenAtMs);

  return (
    <div className={`p-4 ${isNew ? 'bg-primary-50' : ''}`}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="typo-14-bold">예약 {label}</div>
        </div>
        <div className="flex items-center gap-3">
          <time dateTime={updatedAt} className="typo-12-medium text-gray-400">
            {getTimeAgo(updatedAt)}
          </time>
          <button type="button" onClick={() => void onDelete(id)}>
            <DeleteIcon className="h-6 text-gray-300 hover:text-gray-700" />
          </button>
        </div>
      </div>
      <div className="typo-14-medium text-gray-800">
        <p>{title}</p>
        <p>({date})</p>
        <p>
          예약이 <span className={`font-semibold ${color}`}>{label}</span> 되었어요
        </p>
      </div>
    </div>
  );
}
