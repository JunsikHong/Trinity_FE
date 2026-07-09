import ViewSection from "@/pages/home/view/components/ViewSection";
import ButtonSection from "@/pages/home/view/components/ButtonSection";
import { useRepairDetail } from "@/hooks/repair/useRepairDetail";
import { useRepairStore } from "@/store/repairStore";

const ViewPage = () => {
    const { selectedRepairId } = useRepairStore();
    const { data: repairDetail, isLoading } = useRepairDetail(selectedRepairId);
    
    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <ViewSection repairDetail={repairDetail} isLoading={isLoading}/>
                <ButtonSection />
            </div>
        </>
    );
};

export default ViewPage;
