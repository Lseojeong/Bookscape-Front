/** @type {import('svgo').Config} */
const svgoConfig = {
  multipass: true,
  plugins: [
    'preset-default',
    // 아이콘/일러스트에서 viewBox 제거되면 반응형 스케일이 깨질 수 있어 비활성화합니다.
    { name: 'removeViewBox', active: false },
    // width/height가 있으면 viewBox 기반 반응형 사용에 방해가 될 수 있어 제거합니다.
    'removeDimensions',
  ],
};

export default svgoConfig;
