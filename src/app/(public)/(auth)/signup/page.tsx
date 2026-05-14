import { Metadata } from 'next';
import SignupClient from '@/features/auth/ui/SignupClient';

export const metadata: Metadata = {
  title: '회원가입',
  description: '북스케이프에 회원가입하세요.',
  robots: { index: false }, // 검색 결과 노출 제외
};

/**
 * 회원가입 페이지 서버 컴포넌트입니다.
 */
export default function SignupPage() {
  return <SignupClient />;
}
