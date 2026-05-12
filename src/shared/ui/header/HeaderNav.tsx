import type { AvatarUser } from '@/shared/ui/avatar/types';
import GuestNav from '@/shared/ui/header/GuestNav';
import type { HeaderTheme } from '@/shared/ui/header/types';
import UserNav from '@/shared/ui/header/UserNav';

/**
 * HeaderNav 컴포넌트 Props 입니다.
 *
 * @property theme - 헤더 테마 (`'primary' | 'light'`)
 * @property isLoggedIn - 로그인 여부
 * @property user - 로그인 유저 정보
 */
type HeaderNavProps = {
  theme: HeaderTheme;
  isLoggedIn?: boolean;
  user?: AvatarUser;
  onLogout: () => void;
};

type LoggedInActionsProps = {
  theme: HeaderTheme;
  user: AvatarUser;
  onLogout: () => void;
};

function LoggedInActions({ theme, user, onLogout }: LoggedInActionsProps) {
  return <UserNav theme={theme} user={user} onLogout={onLogout} />;
}

type GuestActionsProps = {
  theme: HeaderTheme;
};

function GuestActions({ theme }: GuestActionsProps) {
  return <GuestNav theme={theme} />;
}

/**
 * ## HeaderNav
 *
 * 헤더 우측 영역(유저 메뉴/게스트 메뉴)을 렌더링하는 컴포넌트입니다.
 *
 * @remarks
 * - `isLoggedIn && user`이면 `UserNav`를 렌더링합니다.
 * - 그 외에는 `GuestNav`를 렌더링합니다.
 *
 * @param props.theme - 헤더 테마
 * @param props.isLoggedIn - 로그인 여부
 * @param props.user - 유저 정보
 */
export default function HeaderNav({ theme, isLoggedIn = false, user, onLogout }: HeaderNavProps) {
  if (isLoggedIn && user) {
    return <LoggedInActions theme={theme} user={user} onLogout={onLogout} />;
  }

  return <GuestActions theme={theme} />;
}
