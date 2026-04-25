import type { Meta, StoryObj } from '@storybook/nextjs';
import { useRef, useState } from 'react';
import SearchInputUi from '@/shared/ui/search-input/SearchInputUi';

const meta: Meta<typeof SearchInputUi> = {
  title: 'Shared/SearchInput',
  component: SearchInputUi,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchInputUi>;

/** 기본 상태 - 엔터 키 또는 버튼 클릭 시 하단에 검색어 출력 */
export const Default: Story = {
  render: () => {
    const SearchInputTest = () => {
      const [submitted, setSubmitted] = useState('');
      const ref = useRef<HTMLInputElement>(null);

      /** 스토리북 전용 핸들러 - ref로 input 값을 읽어 검색어 출력 */
      const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setSubmitted(ref.current?.value ?? '');
      };

      return (
        <div className="flex w-100 flex-col gap-6 rounded-xl bg-gray-50 p-8">
          <SearchInputUi ref={ref} onSubmit={handleSubmit} />
          <p className="typo-14-medium text-gray-600">
            <span className="typo-16-bold">검색어 : {submitted}</span>
          </p>
        </div>
      );
    };

    return <SearchInputTest />;
  },
};

/** 초기 검색어가 있는 상태 */
export const WithKeyword: Story = {
  render: () => {
    const SearchInputTest = () => {
      const [submitted, setSubmitted] = useState('제주도');
      const ref = useRef<HTMLInputElement>(null);

      const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setSubmitted(ref.current?.value ?? '');
      };

      return (
        <div className="flex w-100 flex-col gap-6 rounded-xl bg-gray-50 p-8">
          <SearchInputUi ref={ref} onSubmit={handleSubmit} defaultValue="제주도" />
          <p className="typo-14-medium text-gray-600">
            <span className="typo-16-bold">검색어 : {submitted}</span>
          </p>
        </div>
      );
    };

    return <SearchInputTest />;
  },
};
