import type { Meta, StoryObj } from '@storybook/nextjs';
import React, { useState } from 'react';
import ImageUploader from '@/features/my-page/activity-form/ui/image-uploader/ImageUploader';

const meta: Meta<typeof ImageUploader> = {
  title: 'Features/MyPage/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: 'text',
      description: '업로더 상단에 표시될 폼 라벨입니다.',
    },
    errorMessage: {
      control: 'text',
      description: '유효성 검사 실패 시 하단에 표시될 에러 메시지입니다.',
    },
    maxCount: {
      control: { type: 'number', min: 1, max: 10 },
      description: '최대 업로드 가능한 이미지 개수입니다.',
    },
    showCounter: {
      control: 'boolean',
      description: '하단에 등록된 이미지 개수 표시 여부입니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageUploader>;

const InteractiveTemplate = (args: React.ComponentProps<typeof ImageUploader>) => {
  const [images, setImages] = useState<(File | string)[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    setImages((prev) => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, args.maxCount ?? 1);
    });

    e.target.value = '';
  };

  const handleImageRemove = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-200 border border-dashed border-gray-300 bg-white p-8">
      <ImageUploader
        {...args}
        images={images}
        onChange={handleImageChange}
        onRemove={handleImageRemove}
      />
    </div>
  );
};

export const Playground: Story = {
  render: InteractiveTemplate,
  args: {
    label: '이미지 등록',
    maxCount: 3,
    showCounter: true,
  },
};

export const BannerMode: Story = {
  render: InteractiveTemplate,
  args: {
    label: '배너 이미지 등록',
    maxCount: 1,
    showCounter: false,
  },
};

export const SubImageMode: Story = {
  render: InteractiveTemplate,
  args: {
    label: '소개 이미지 등록 (선택)',
    maxCount: 4,
    showCounter: true,
  },
};

export const WithError: Story = {
  render: InteractiveTemplate,
  args: {
    label: '배너 이미지 등록',
    maxCount: 1,
    showCounter: false,
    errorMessage: '배너 이미지를 등록해주세요',
  },
};
