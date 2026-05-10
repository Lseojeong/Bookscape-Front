'use client';

import { useRouter } from 'next/navigation';
import PageHeader from '@/shared/ui/page-header/PageHeader';

export default function MyActivityPageHeader() {
  const router = useRouter();

  return (
    <PageHeader
      title="내 체험 관리"
      description="체험을 등록하거나 수정 및 삭제가 가능합니다."
      onBack={() => router.back()}
    />
  );
}
