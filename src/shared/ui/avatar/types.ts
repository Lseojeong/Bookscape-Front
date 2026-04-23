/**
 * avatar(프로필)에 사용되는 타입 정의
 */

import { FC } from 'react';
import AvatarFallback from '@/shared/ui/avatar/AvatarFallback';
import AvatarImage from '@/shared/ui/avatar/AvatarImage';

/** Avatar 사이즈  */
export type AvatarSize = 'sm' | 'md' | 'lg';

/** 아바타에 표시할 유저 정보 */
export type AvatarUser = {
  nickname?: string;
  profileImageUrl?: string | null;
};

/** Avatar 컴포넌트의 props */
export type AvatarProps = {
  user: AvatarUser;
  size?: AvatarSize;
  children: React.ReactNode;
  className?: string;
  loading?: 'lazy' | 'eager';
};

/** 컴파운드 패턴을 위한 Avatar 컴포넌트 타입 */
export type AvatarComponent = FC<AvatarProps> & {
  Img: typeof AvatarImage;
  Fallback: typeof AvatarFallback;
};
