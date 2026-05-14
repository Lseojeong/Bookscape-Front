'use client';

import PageHeader from '@/shared/ui/page-header/PageHeader';

/**
 * 내 정보 페이지 헤더 컴포넌트
 *
 * @description
 * `useRouter`를 사용하므로 클라이언트 컴포넌트로 분리합니다.
 */
export default function MyInfoPageHeader() {
  return <PageHeader title="내 정보" description="닉네임과 비밀번호를 수정하실 수 있습니다." />;
}
