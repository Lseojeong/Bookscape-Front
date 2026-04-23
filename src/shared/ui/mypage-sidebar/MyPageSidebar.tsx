import MyPageNav from '@/shared/ui/mypage-sidebar/MyPageNav';

export default function MyPageSidebar() {
  return (
    <aside className="hidden max-w-44.5 rounded-xl border border-gray-50 bg-white px-3.5 py-6 shadow-[0_1px_10px_0_rgba(0,0,0,0.1)] min-[376px]:block lg:max-w-72.5">
      <div className="mb-4">{}</div>
      <MyPageNav />
    </aside>
  );
}
