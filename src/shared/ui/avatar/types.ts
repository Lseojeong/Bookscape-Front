/**
 * avatar(프로필)에 사용되는 타입 정의
 */

import { ImageProps } from 'next/image';
import { ComponentType, PropsWithChildren, ReactNode } from 'react';

/** Avatar 사이즈  */
export type AvatarSize = 'sm' | 'md' | 'lg';

/** 아바타에 표시할 유저 정보 */
export type AvatarUser = {
  nickname?: string;
  profileImageUrl?: string | null;
};

/** 공통 props */
type BaseProps = {
  className?: string;
};

/** Avatar */
export type AvatarProps = PropsWithChildren<
  BaseProps & {
    user: AvatarUser;
    size?: AvatarSize;
  }
>;

/** Avatar Image */
export type AvatarImgProps = BaseProps & Omit<ImageProps, 'src' | 'alt'>;

/** Avatar Fallback */
export type AvatarFallbackProps = BaseProps;

/** 컴파운드 패턴을 위한 Avatar 컴포넌트 타입 */
export type AvatarComponent = {
  (props: AvatarProps): ReactNode;
  Img: ComponentType<AvatarImgProps>;
  Fallback: ComponentType<AvatarFallbackProps>;
};
