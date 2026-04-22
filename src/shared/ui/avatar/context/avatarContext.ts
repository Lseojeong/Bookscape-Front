'use client';
import { createContext, useContext } from 'react';
import type { AvatarSize, AvatarUser } from '../types';

export const AvatarSizeContext = createContext<AvatarSize>('lg');
export const AvatarUserContext = createContext<AvatarUser | null>(null);

export function useAvatarSize() {
  return useContext(AvatarSizeContext);
}

export function useAvatarUser() {
  return useContext(AvatarUserContext);
}
