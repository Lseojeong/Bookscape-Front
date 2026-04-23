'use client';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import type { AvatarSize, AvatarUser } from '@/shared/ui/avatar/types';

export type AvatarContextType = {
  user: AvatarUser | null;
  size: AvatarSize;
  imageError: boolean;
  setImageError: Dispatch<SetStateAction<boolean>>;
  loading?: 'lazy' | 'eager';
};

export const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const useAvatarContext = () => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('Avatar 컴포넌트 내부에서만 사용 가능합니다');
  }
  return context;
};
