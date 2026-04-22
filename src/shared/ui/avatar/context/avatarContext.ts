'use client';
import { createContext, useContext } from 'react';
import type { AvatarSize, AvatarUser } from '@/shared/ui/avatar/types';

export const AvatarSizeContext = createContext<AvatarSize>('lg');
export const AvatarUserContext = createContext<AvatarUser | null>(null);

export const useAvatarSize = () => useContext(AvatarSizeContext);

export const useAvatarUser = () => useContext(AvatarUserContext);
