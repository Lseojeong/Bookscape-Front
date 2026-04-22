import type { AvatarSize } from '@/shared/ui/avatar/types';

export const AVATAR_SIZE_CLASS_NAMES: Record<AvatarSize, string> = {
  sm: 'w-7.5 h-7.5', // 30px
  md: 'w-17.5 h-17.5 ', // 70px
  lg: 'w-30 h-30', // 120px
};
