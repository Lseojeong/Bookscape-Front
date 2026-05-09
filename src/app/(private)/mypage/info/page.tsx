'use client';

import { useRouter } from 'next/navigation';
import type { UserResponse } from '@/features/user/types';
import ProfileForm from '@/features/user/ui/ProfileForm';
import PageHeader from '@/shared/ui/page-header/PageHeader';

/**
 * 내 정보 페이지
 *
 * @description
 * 로그인한 사용자의 프로필 정보를 조회하고 수정할 수 있는 페이지입니다.
 * - 프로필 이미지 업로드 / 기본 이미지로 초기화
 * - 닉네임 수정
 * - 비밀번호 변경 (소셜 로그인 유저 제외)
 *
 */

//TODO: API 연동 후 mockUser 제거
const mockUser: UserResponse = {
  id: 1,
  email: 'codeit@codeit.com',
  nickname: '정만철',
  profileImageUrl: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
};

export default function MyInfoPage() {
  const router = useRouter();

  return (
    <div>
      <PageHeader
        title="내 정보"
        description="닉네임과 비밀번호를 수정하실 수 있습니다."
        onBack={() => router.back()}
      />
      <div className="mt-6 flex w-full flex-col items-center gap-6 md:w-119 lg:w-160">
        <ProfileForm
          user={mockUser}
          onUpdateUser={async (body) => {
            console.log('PATCH body:', body);
          }}
        />
      </div>
    </div>
  );
}
