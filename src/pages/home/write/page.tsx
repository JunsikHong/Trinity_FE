import WriteSection from "@/pages/home/write/components/WriteSection";
import ButtonSection from "@/pages/home/write/components/ButtonSection";
import { useMaintenanceDetail } from "@/hooks/useMaintenanceDetail";
import { useMaintenanceStore } from "@/store/maintenanceStore";

const WritePage = () => {
    const { selectedMaintenanceId } = useMaintenanceStore();
    const { data: maintenanceDetail, isLoading } = useMaintenanceDetail(selectedMaintenanceId);
    
    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <WriteSection maintenanceDetail={maintenanceDetail} isLoading={isLoading} />
                <ButtonSection />
            </div>
        </>
    );
};

export default WritePage;