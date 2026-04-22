import type { ReactNode } from 'react';
import { AvatarSizeContext, AvatarUserContext } from '@/shared/ui/avatar/context/avatarContext';
import { AvatarSize, AvatarUser } from '@/shared/ui/avatar/types';

export function AvatarSizeProvider({
  children,
  size,
  user = null,
}: {
  children: ReactNode;
  size: AvatarSize;
  user?: AvatarUser | null;
}) {
  return (
    <AvatarUserContext.Provider value={user}>
      <AvatarSizeContext.Provider value={size}>{children}</AvatarSizeContext.Provider>
    </AvatarUserContext.Provider>
  );
}
