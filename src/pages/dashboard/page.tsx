import ChartSection from '@/pages/dashboard/components/ChartSection';
import StatSection from '@/pages/dashboard/components/StatSection';
import ModelViewSection from '@/pages/dashboard/components/ModelViewSection';
import RecentSection from '@/pages/dashboard/components/RecentSection';

const DashboardPage = () => {
    return (
        <div className="flex gap-2 p-5 bg-page h-full">
            <StatSection />
            <ModelViewSection />
            <RecentSection />
        </div>
    );
}

export default DashboardPage;