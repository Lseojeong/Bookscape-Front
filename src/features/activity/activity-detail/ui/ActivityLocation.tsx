'use client';

import { useEffect, useRef, useState } from 'react';
import { LocationIcon } from '@/shared/assets/icons';
import Title from '@/shared/ui/title/Title';

type ActivityLocationProps = {
  address: string;
};

/**
 * 체험 오시는 길 컴포넌트입니다.
 *
 * 카카오맵 API를 사용하여 체험 주소를 지도로 표시합니다.
 *
 * @example
 * ```tsx
 * <ActivityLocation address={activity.address} />
 * ```
 */
export default function ActivityLocation({ address }: ActivityLocationProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = () => {
      window.kakao.maps.load(() => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (status !== window.kakao.maps.services.Status.OK || !mapRef.current) {
            setIsError(true); // 실패 시 에러 상태로 변경
            return;
          }
          const coords = new window.kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
          const map = new window.kakao.maps.Map(mapRef.current, { center: coords, level: 3 });
          new window.kakao.maps.Marker({ map, position: coords });
        });
      });
    };

    if (window.kakao?.maps) {
      initMap();
      return;
    }

    const interval = setInterval(() => {
      if (window.kakao?.maps) {
        clearInterval(interval);
        initMap();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [address]);

  return (
    <div className="mt-5 md:mt-7.5">
      <Title as="h2" size="16" weight="bold" color="text-gray-950" className="mb-2 md:typo-18-bold">
        오시는 길
      </Title>
      <div className="mb-2 flex items-center gap-1">
        <LocationIcon />
        <p className="typo-16-body-medium text-gray-700">{address}</p>
      </div>
      {isError ? (
        <div className="flex h-45 w-full items-center justify-center rounded-3xl bg-gray-100 md:h-75 lg:h-112.5">
          <p className="typo-16-body-medium text-gray-500">위치 정보를 찾을 수 없습니다.</p>
        </div>
      ) : (
        <div ref={mapRef} className="h-45 w-full rounded-3xl md:h-75 lg:h-112.5" />
      )}
    </div>
  );
}
