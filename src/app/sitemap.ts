import type { MetadataRoute } from 'next';
import { serverFetch } from '@/shared/apis/base/serverFetch';

type ActivityResponse = {
  id: number;
  updatedAt: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bookscape-team1.vercel.app';
  const teamId = '22-1';

  // 동적 페이지
  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const activities = await serverFetch.get<ActivityResponse[]>(
      `/${teamId}/activities`,
      undefined,
      { cache: 'no-store' }
    );

    if (activities) {
      dynamicRoutes = activities.map((activity) => ({
        url: `${baseUrl}/activity/${activity.id}`,
        lastModified: new Date(activity.updatedAt), // 마지막 수정 시간
        changeFrequency: 'weekly' as const, // 주에 한 번 확인
        priority: 0.8, // 페이지 중요도
      }));
    }
  } catch (error) {
    //NOTE: 브라우저 화면이 없는 서버 환경이므로 console.error 사용하여 에러 확인 (버셀 대시보드 로그에서 확인 가능)
    console.error('Sitemap 생성 중 활동 데이터를 불러오지 못했습니다:', error);
  }

  // 정적 페이지
  const staticRoutes = ['', '/activities'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const, // 매일 확인
    priority: route === '' ? 1 : 0.8, // 우선순위: 메인 > 체험목록
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
