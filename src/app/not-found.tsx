import type { Metadata } from 'next';
import NotFoundActions from '@/app/ui/NotFoundActions';
import NotFoundLottie from '@/app/ui/NotFoundLottie';

/**
 * 404(Not Found) 페이지의 메타데이터입니다.
 *
 * 사용자가 존재하지 않는 경로로 접근했을 때 브라우저 탭 타이틀에 반영됩니다.
 */
export const metadata: Metadata = {
  title: 'Page Not Found',
};

/**
 * 요청한 페이지를 찾을 수 없을 때 표시되는 404 에러 페이지 컴포넌트입니다.
 */
export default function NotFoundPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-primary-500 px-6">
      <div className="flex flex-col items-center text-center">
        <NotFoundLottie />
        <p className="mt-6 typo-24-medium text-primary-50">페이지를 찾을 수 없어요</p>
        <NotFoundActions />
      </div>
    </main>
  );
}
