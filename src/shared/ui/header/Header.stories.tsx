import type { Decorator, Meta, StoryObj } from '@storybook/nextjs';
import { createNavigation, usePathname } from '@storybook/nextjs/navigation.mock';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import Header from '@/shared/ui/header/Header';

const SCROLL_Y = 200;

const ScrollResetter = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return children;
};

const withScrollReset: Decorator = (Story) => (
  <ScrollResetter>
    <Story />
  </ScrollResetter>
);

const meta: Meta<typeof Header> = {
  title: 'Shared/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withScrollReset],
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const PageScaffold = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-[200vh] bg-gray-50">
      {children}
      <main className="mx-auto w-full max-w-380 px-6 py-10 md:px-7.5 xl:px-50">
        <div className="space-y-4">
          <div className="h-40 rounded-lg bg-white" />
          <div className="h-40 rounded-lg bg-white" />
          <div className="h-40 rounded-lg bg-white" />
          <div className="h-40 rounded-lg bg-white" />
          <div className="h-40 rounded-lg bg-white" />
        </div>
      </main>
    </div>
  );
};

const withPageScaffold: Decorator = (Story) => (
  <PageScaffold>
    <Story />
  </PageScaffold>
);

const withPathname = (pathname: string): Decorator => {
  const withPathnameDecorator: Decorator = (Story) => {
    // next/navigation mock 초기화 (useRouter 내부에서 필요)
    createNavigation({});
    usePathname.mockReturnValue(pathname);
    return <Story />;
  };

  return withPathnameDecorator;
};

export const HomeGuest: Story = {
  name: '/ (Guest)',
  args: {
    isLoggedIn: false,
  },
  decorators: [withPageScaffold, withPathname('/')],
};

export const HomeLoggedIn: Story = {
  name: '/ (Logged In)',
  args: {
    isLoggedIn: true,
    user: {
      nickname: '정만철',
      profileImageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGVm5P0-8Mjkm597XaYeSL2BlMIwp-APf0Q&s',
    },
  },
  decorators: [withPageScaffold, withPathname('/')],
};

export const HomeScrolled: Story = {
  name: '/ (Scrolled)',
  args: {
    isLoggedIn: true,
    user: {
      nickname: '정만철',
      profileImageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGVm5P0-8Mjkm597XaYeSL2BlMIwp-APf0Q&s',
    },
  },
  decorators: [withPageScaffold, withPathname('/')],
  play: async ({ canvasElement }) => {
    const win = canvasElement.ownerDocument.defaultView;
    if (!win) return;

    await new Promise((r) => win.setTimeout(r, 0));
    win.scrollTo(0, SCROLL_Y);
    win.dispatchEvent(new Event('scroll'));
  },
};

export const ActivitiesGuest: Story = {
  name: '/activities (Guest)',
  args: {
    isLoggedIn: false,
  },
  decorators: [withPageScaffold, withPathname('/activities')],
};

export const ActivitiesLoggedIn: Story = {
  name: '/activities (Logged In)',
  args: {
    isLoggedIn: true,
    user: {
      nickname: '정만철',
      profileImageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGVm5P0-8Mjkm597XaYeSL2BlMIwp-APf0Q&s',
    },
  },
  decorators: [withPageScaffold, withPathname('/activities')],
};
