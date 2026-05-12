import NotFoundActions from '@/app/ui/NotFoundActions';
import NotFoundLottie from '@/app/ui/NotFoundLottie';

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
