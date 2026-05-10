'use client';

import { useUserStore } from '@/shared/stores/userStore';
import Header from '@/shared/ui/header/Header';

export default function HeaderContainer() {
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const user = useUserStore((state) => state.user);

  return (
    <Header
      isLoggedIn={hasHydrated && !!user}
      user={user ? { nickname: user.nickname, profileImageUrl: user.profileImageUrl } : undefined}
    />
  );
}
