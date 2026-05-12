'use client';

import { useLogout } from '@/shared/hooks/useLogout';
import { useUserStore } from '@/shared/stores/userStore';
import Header from '@/shared/ui/header/Header';

export default function HeaderContainer() {
  const hasHydrated = useUserStore((state) => state.hasHydrated);
  const user = useUserStore((state) => state.user);
  const { handleLogout } = useLogout();

  return (
    <Header
      isLoggedIn={hasHydrated && !!user}
      user={user ? { nickname: user.nickname, profileImageUrl: user.profileImageUrl } : undefined}
      onLogout={handleLogout}
    />
  );
}
