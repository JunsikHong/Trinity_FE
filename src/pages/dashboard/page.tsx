import ChartSection from '@/pages/dashboard/components/ChartSection';
import StatSection from '@/pages/dashboard/components/StatSection';
import { useState } from 'react';

type StatType =
    | "all"
    | "airplaneType"
    | "airplane"
    | "chapter";
    
const DashboardPage = () => {

    const [selectedStat, setSelectedStat] = useState<StatType>("all");

    return (
        <div className="flex flex-col gap-6 p-5 bg-page h-full">
            <StatSection 
                selectedStat={selectedStat}
                setSelectedStat={setSelectedStat}
            />
            <ChartSection
                selectedStat={selectedStat}
            />
        </div>
    );
}

export default DashboardPage;