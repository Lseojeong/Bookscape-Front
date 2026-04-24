import { useState, type ReactNode } from 'react';
import { AvatarContext } from '@/shared/ui/avatar/context/avatarContext';
import type { AvatarSize, AvatarUser } from '@/shared/ui/avatar/types';

export function AvatarProvider({
  children,
  size,
  user = null,
  loading = 'lazy',
}: {
  children: ReactNode;
  size: AvatarSize;
  user?: AvatarUser | null;
  loading?: 'lazy' | 'eager';
}) {
  const [imageError, setImageError] = useState(false);
  return (
    <AvatarContext.Provider value={{ user, size, imageError, setImageError, loading }}>
      {children}
    </AvatarContext.Provider>
  );
}
