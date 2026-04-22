import { avatarSizeClassNames } from '@/shared/ui/avatar/AvatarConstants';
import AvatarFallback from '@/shared/ui/avatar/AvatarFallback';
import AvatarImage from '@/shared/ui/avatar/AvatarImage';
import { AvatarSizeProvider } from '@/shared/ui/avatar/context/avatarProvider';
import type { AvatarProps, AvatarComponent } from '@/shared/ui/avatar/types';
import { cn } from '@/shared/utils/cn';

/**
 * 사용자의 프로필 이미지를 표시하는 아바타 컴포넌트입니다.
 * 이미지 로드 실패 시 또는 이미지가 없을 때 Fallback UI를 제공합니다.
 *
 * @example
 * <Avatar user={user}>
 *  {user.profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
 * </Avatar>
 */
const Avatar = (({ children, user, size = 'lg', className }: AvatarProps) => {
  return (
    <AvatarSizeProvider size={size} user={user}>
      <div
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden rounded-full',
          avatarSizeClassNames[size],
          className
        )}
      >
        {children}
      </div>
    </AvatarSizeProvider>
  );
}) as AvatarComponent;

Avatar.Img = AvatarImage;
Avatar.Fallback = AvatarFallback;

export default Avatar;
