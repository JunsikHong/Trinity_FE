import StatusSection from '@/pages/dashboard/components/StatusSection';
import ModelViewSection from '@/pages/dashboard/components/ModelViewSection';
import RecentSection from '@/pages/dashboard/components/RecentSection';

const DashboardPage = () => {
    return (
        <div className="flex flex-col gap-2 p-5">
            <StatusSection />
            <ModelViewSection />
            <RecentSection />
        </div>
    );
}

export default DashboardPage;