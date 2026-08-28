import ChartSection from '@/pages/dashboard/components/ChartSection';
import StatSection from '@/pages/dashboard/components/StatSection';
import ModelViewSection from '@/pages/dashboard/components/ModelViewSection';
import RecentSection from '@/pages/dashboard/components/RecentSection';
import { useState } from 'react';

const DashboardPage = () => {

    const [selectedStat, setSelectedStat] = useState("all");

    return (
        <div className="flex flex-col gap-2 p-5 bg-page h-full">
            <StatSection 
                selectedStat={selectedStat}
                setSelectedStat={setSelectedStat}
            />
        </div>
    );
}

export default DashboardPage;