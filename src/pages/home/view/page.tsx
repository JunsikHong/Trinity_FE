import ViewSection from "@/pages/home/view/components/ViewSection";
import ButtonSection from "@/pages/home/view/components/ButtonSection";
import { useRepairDetail } from "@/hooks/repair/useRepair";
import { useRepairStore } from "@/store/repairStore";

const ViewPage = () => {
    const { selectedRepairId } = useRepairStore();
    const { data: repairDetail, isLoading } = useRepairDetail(selectedRepairId);
    
    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <ViewSection repairDetail={repairDetail} isLoading={isLoading}/>
                <ButtonSection selectedRepairId={selectedRepairId}/>
            </div>
        </>
    );
};

export default ViewPage;
