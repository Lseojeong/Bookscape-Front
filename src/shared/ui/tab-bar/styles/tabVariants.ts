import { cva } from 'class-variance-authority';

export const tabVariants = cva(
  'h-10 cursor-pointer flex items-center justify-center -mb-px', // 모든 탭에 공통으로 적용될 스타일
  {
    variants: {
      state: {
        active: 'typo-16-bold text-primary-500 border-b-2 border-primary-500', // 활성화 탭
        inactive: 'typo-16-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent', // 비활성화 탭
      },
    },
  }
);
