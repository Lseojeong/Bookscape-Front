/**
 * avatar(프로필)에 사용되는 타입 정의
 */

import { ReactNode } from 'react';
import AvatarFallback from '@/shared/ui/avatar/AvatarFallback';
import AvatarImage from '@/shared/ui/avatar/AvatarImage';

/** Avatar 사이즈  */
export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarImageProps = {
  profileImageUrl?: string;
};

export type AvatarUser = {
  nickname?: string;
  profileImageUrl?: string;
};

export type AvatarProps = {
  user: AvatarUser;
  size?: AvatarSize;
  children: React.ReactNode;
  className?: string;
};

export type AvatarComponent = ((props: AvatarProps) => ReactNode) & {
  Img: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
};
