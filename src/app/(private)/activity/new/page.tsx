import { Metadata } from 'next';
import ActivityNewClient from '@/features/my-page/activity-form/new/ui/ActivityNewClient';

export const metadata: Metadata = {
  title: '내 체험 등록',
};

/**
 * 새로운 체험을 등록하는 페이지 서버 컴포넌트입니다.
 */
export default function ActivityNewPage() {
  return <ActivityNewClient />;
}
