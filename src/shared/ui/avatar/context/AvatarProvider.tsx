import { useState, type ReactNode } from 'react';
import { AvatarContext } from '@/shared/ui/avatar/context/avatarContext';
import type { AvatarSize, AvatarUser } from '@/shared/ui/avatar/types';

export function AvatarProvider({
  children,
  size,
  user = null,
}: {
  children: ReactNode;
  size: AvatarSize;
  user?: AvatarUser | null;
}) {
  const [imageError, setImageError] = useState(false);
  return (
    <AvatarContext.Provider value={{ user, size, imageError, setImageError }}>
      {children}
    </AvatarContext.Provider>
  );
}
