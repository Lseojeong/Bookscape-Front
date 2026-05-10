'use client';

import Link from 'next/link';
import { PlusIcon } from '@/shared/assets/icons';
import Button from '@/shared/ui/button/Button';

export default function MyActivityCreateButton() {
  return (
    <>
      {/* Desktop button */}
      <Button
        as={Link}
        href="/activity/new"
        size="md"
        className="hidden h-12 w-auto rounded-2xl px-6 typo-16-bold md:inline-flex"
      >
        체험 등록하기
      </Button>

      {/* Mobile icon button */}
      <Button
        as={Link}
        href="/activity/new"
        size="icon"
        aria-label="체험 등록하기"
        className="md:hidden"
      >
        <PlusIcon />
      </Button>
    </>
  );
}
