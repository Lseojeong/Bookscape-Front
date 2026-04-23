'use client';

import Avatar from '@/shared/ui/avatar/Avatar';
import type { AvatarProps } from '@/shared/ui/avatar/types';
import MyPageNav from '@/shared/ui/mypage-sidebar/MyPageNav';

type MyPageSidebarProps = {
  user: AvatarProps['user'];
};

export default function MyPageSidebar({ user }: MyPageSidebarProps) {
  return (
    <aside className="hidden max-w-44.5 rounded-xl border border-gray-50 bg-white px-3.5 py-4 shadow-[0_1px_10px_0_rgba(0,0,0,0.1)] min-[376px]:block lg:max-w-72.5 lg:py-6">
      <div className="mb-3 flex justify-center lg:mb-6">
        <Avatar user={user} size="md" className="lg:h-30 lg:w-30">
          {user?.profileImageUrl ? <Avatar.Img /> : <Avatar.Fallback />}
        </Avatar>
      </div>
      <MyPageNav />
    </aside>
  );
}
