import AllActivitiesSection from '@/app/(public)/(explore)/activities/ui/AllActivitiesSection';
import ActivitiesPageHeader from '@/features/activity/activities/ui/ActivitiesPageHeader';

export default function ActivitiesPage() {
  return (
    <div className="mx-auto mt-12 mb-10 flex max-w-280 flex-col px-6 md:mt-16.5 md:mb-25 md:px-7.5 xl:px-0">
      <ActivitiesPageHeader />
      <AllActivitiesSection />
    </div>
  );
}
