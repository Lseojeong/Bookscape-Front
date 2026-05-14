import { Metadata } from 'next';
import LoginClient from '@/features/auth/ui/LoginClient';

export const metadata: Metadata = {
  title: '로그인',
  description: '북스케이프에 로그인하세요.',
  robots: { index: false }, // 검색 결과 노출 제외
};

/**
 * 로그인 페이지 서버 컴포넌트입니다.
 */
export default function LoginPage() {
  return <LoginClient />;
}
