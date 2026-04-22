import { AVATAR_SIZE_CLASS_NAMES } from '@/shared/ui/avatar/AvatarConstants';
import AvatarFallback from '@/shared/ui/avatar/AvatarFallback';
import AvatarImage from '@/shared/ui/avatar/AvatarImage';
import { AvatarSizeProvider } from '@/shared/ui/avatar/context/avatarProvider';
import { cn } from '@/shared/utils/cn';
import type { AvatarProps, AvatarComponent } from './types';

/**
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
          AVATAR_SIZE_CLASS_NAMES[size],
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
