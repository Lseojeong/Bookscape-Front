import AuthBranding from '@/features/auth/ui/AuthBranding';
import AuthHeadline from '@/features/auth/ui/AuthHeadline';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex justify-between">
      <div className="mt-13.5 grow px-6 md:mt-29.5 md:px-13.5">
        <AuthHeadline />
        <div className="">{children}</div>
      </div>
      <div className="hidden shrink-0 transition-all lg:block xl:w-200 2xl:w-250">
        <AuthBranding />
      </div>
    </main>
  );
}
