import { cva } from 'class-variance-authority';
import { useRouter } from 'next/navigation';
import NotificationButton from '@/features/notification/ui/NotificationButton';
import type { AvatarUser } from '@/shared/ui/avatar/types';
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
 * @property onLogout - 로그아웃 클릭 시 실행할 콜백
 */
type UserNavProps = {
  theme: HeaderTheme;
  user: AvatarUser;
  className?: string;
  onLogout?: () => void;
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
 * @param props.onLogout - 로그아웃 콜백
 */
export default function UserNav({ theme, user, className, onLogout }: UserNavProps) {
  const router = useRouter();
  // TODO: 실제 로그아웃 로직(인증 상태/토큰/스토어 초기화 등) 연결
  const handleLogout = onLogout ?? (() => {});

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
          <ActionDropdownItem onClick={handleLogout}>로그아웃</ActionDropdownItem>
        </ActionDropdownContent>
      </ActionDropdown>
    </div>
  );
}
