import ViewSection from "@/pages/home/view/components/ViewSection";
import ButtonSection from "@/pages/home/view/components/ButtonSection";
import { useMaintenanceDetail } from "@/hooks/useMaintenanceDetail";
import { useMaintenanceStore } from "@/store/maintenanceStore";

const ViewPage = () => {
    const { selectedMaintenanceId } = useMaintenanceStore();
    const { data: maintenanceDetail, isLoading } = useMaintenanceDetail(selectedMaintenanceId);
    
    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <ViewSection maintenanceDetail={maintenanceDetail} isLoading={isLoading}/>
                <ButtonSection />
            </div>
        </>
    );
};

export default ViewPage;
