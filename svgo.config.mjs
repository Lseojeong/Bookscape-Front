import path from 'node:path';

/** @type {import('svgo').Config} */
const svgoConfig = {
  multipass: true,
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // 아이콘/일러스트에서 viewBox 제거되면 반응형 스케일이 깨질 수 있어 유지합니다.
          removeViewBox: false,
          // 여러 SVG를 한 페이지에 렌더링할 때 ID 충돌을 방지하기 위해 비활성화합니다.
          cleanupIds: false,
        },
      },
    },
    // 여러 SVG가 한 페이지에 있을 때 ID 충돌을 방지하기 위해 파일명 기반 접두사를 부여합니다.
    {
      name: 'prefixIds',
      params: {
        prefix: (_node, info) => {
          const filePath = info?.path;
          if (!filePath) return 'svg';
          return path.basename(filePath, path.extname(filePath));
        },
      },
    },
    // width/height가 있으면 viewBox 기반 반응형 사용에 방해가 될 수 있어 제거합니다.
    'removeDimensions',
  ],
};

export default svgoConfig;
