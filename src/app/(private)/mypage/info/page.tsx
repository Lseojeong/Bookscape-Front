'use client';

import { useRouter } from 'next/navigation';
import type { UserResponse } from '@/features/user/types';
import ImageUploadBox from '@/features/user/ui/ImageUploadBox';
import ProfileForm from '@/features/user/ui/ProfileForm';
import PageHeader from '@/shared/ui/page-header/PageHeader';

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
        <ImageUploadBox initialImageUrl="" />
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
