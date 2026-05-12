'use client';
import { cva } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import NotificationButton from '@/features/notification/ui/NotificationButton';
import type { AvatarUser } from '@/shared/ui/avatar/types';
import ConfirmDialog from '@/shared/ui/dialog/ConfirmDialog';
import {
  ActionDropdown,
  ActionDropdownContent,
  ActionDropdownItem,
  ActionDropdownTrigger,
} from '@/shared/ui/dropdown/action';
import Profile from '@/shared/ui/header/profile/Profile';
import type { HeaderTheme } from '@/shared/ui/header/types';
import { cn } from '@/shared/utils/cn';

const dividerVariants = cva('h-3.5 w-px bg-gray-100');

const profileNicknameVariants = cva('', {
  variants: {
    theme: {
      primary: 'text-white',
      light: '',
    },
  },
  defaultVariants: {
    theme: 'light',
  },
});

/**
 * UserNav 컴포넌트 Props 입니다.
 *
 * @property theme - 헤더 테마 (`'primary' | 'light'`)
 * @property user - 유저 정보
 * @property className - wrapper에 추가할 클래스
 */
type UserNavProps = {
  theme: HeaderTheme;
  user: AvatarUser;
  className?: string;
  onLogout: () => void;
};

/**
 * ## UserNav
 *
 * 로그인 상태에서 사용하는 헤더 우측 메뉴 컴포넌트입니다.
 *
 * @remarks
 * - 알림 버튼과 프로필 드롭다운(마이페이지/로그아웃)을 제공합니다.
 * - 드롭다운은 `ActionDropdown` 기반으로 동작합니다.
 *
 * @param props.theme - 헤더 테마
 * @param props.user - 유저 정보
 * @param props.className - 추가 클래스
 */
export default function UserNav({ theme, user, className, onLogout }: UserNavProps) {
  const router = useRouter();
  const handleLogout = onLogout;
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div className={cn('flex items-center gap-5', className)}>
      <NotificationButton theme={theme} />

      <span aria-hidden="true" className={dividerVariants()} />

      <ActionDropdown>
        <ActionDropdownTrigger className="flex items-center" ariaLabel="유저 메뉴 열기">
          <Profile user={user} size="sm" nicknameClassName={profileNicknameVariants({ theme })} />
        </ActionDropdownTrigger>

        <ActionDropdownContent className="right-0 left-auto">
          <ActionDropdownItem onClick={() => router.push('/mypage/info')}>
            마이페이지
          </ActionDropdownItem>
          <ActionDropdownItem onClick={() => setIsLogoutModalOpen(true)}>
            로그아웃
          </ActionDropdownItem>
        </ActionDropdownContent>
      </ActionDropdown>
      <ConfirmDialog
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="로그아웃 하시겠습니까?"
        confirmText="네"
        cancelText="아니오"
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
