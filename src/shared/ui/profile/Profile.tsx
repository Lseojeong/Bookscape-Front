import Avatar from '@/shared/ui/avatar/Avatar';
import type { AvatarProps } from '@/shared/ui/avatar/types';
import { cn } from '@/shared/utils/cn';

type ProfileProps = Omit<AvatarProps, 'children'> & {
  nicknameClassName?: string;
};

/**
 * 아바타 + 닉네임 조합으로 된 프로필 컴포넌트입니다.
 * 닉네임 색상은 검정(text-gray-950)이 기본 값입니다.
 *
 * @example
 * // 기본 컴포넌트
 * <Profile user={user} size="md" />
 *
 * // 색상 변경 컴포넌트
 * <Profile user={user} size="md" nicknameClassName="text-gray-500" />
 * <Profile user={user} size="md" nicknameClassName="text-white" />
 *
 */
export default function Profile({
  user,
  size = 'sm',
  nicknameClassName = 'text-gray-950',
}: ProfileProps) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar user={user} size={size}>
        <Avatar.Img />
        <Avatar.Fallback />
      </Avatar>
      <span
        className={cn('typo-14-medium', nicknameClassName)}
        aria-label={`${user?.nickname || '사용자'}`}
      >
        {user.nickname ?? '사용자'}
      </span>
    </div>
  );
}
