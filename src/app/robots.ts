import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/shared/constants/url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // 모든 검색 엔진 봇 접근 허용
      allow: '/', // 사이트 전체 페이지 수집
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
