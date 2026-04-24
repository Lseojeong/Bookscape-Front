import { avatarSizeClassNames } from '@/shared/ui/avatar/avatarConstants';
import AvatarFallback from '@/shared/ui/avatar/AvatarFallback';
import AvatarImage from '@/shared/ui/avatar/AvatarImage';
import { AvatarProvider } from '@/shared/ui/avatar/context/AvatarProvider';
import type { AvatarProps } from '@/shared/ui/avatar/types';
import { cn } from '@/shared/utils/cn';

/**
 * 사용자의 프로필 이미지를 표시하는 아바타 컴포넌트입니다.
 * 이미지 로드 실패 시 또는 이미지가 없을 때 Fallback UI를 제공합니다.
 *
 * @example Avatar 내부에서 알아서 처리하게끔 분기없이 작성
 * <Avatar user={user}>
 *  <Avatar.Img />
 *  <Avatar.Fallback />
 * </Avatar>
 */
export default function Avatar({ children, user, size = 'lg', className, loading }: AvatarProps) {
  return (
    <AvatarProvider size={size} user={user} loading={loading}>
      <div
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-full',
          avatarSizeClassNames[size],
          className
        )}
      >
        {children}
      </div>
    </AvatarProvider>
  );
}

Avatar.Img = AvatarImage;
Avatar.Fallback = AvatarFallback;
