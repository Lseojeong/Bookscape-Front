'use client';

import type { UserResponse } from '@/features/user/types';
import ProfileForm from '@/features/user/ui/ProfileForm';

type MyInfoClientProps = {
  user: UserResponse;
};

/**
 * 내 정보 페이지 클라이언트 컴포넌트
 *
 * @description
 * 서버 컴포넌트인 MyInfoPage에서 이벤트 핸들러를 분리합니다.
 */
export default function MyInfoClient({ user }: MyInfoClientProps) {
  return (
    <div className="mt-6 flex w-full flex-col items-center gap-6 md:w-119 lg:w-160">
      <ProfileForm
        user={user}
        onUpdateUser={async (body) => {
          console.log('PATCH body:', body);
        }}
      />
    </div>
  );
}
