import WriteSection from "@/pages/home/write/components/WriteSection";
import ButtonSection from "@/pages/home/write/components/ButtonSection";
import { useRepairDetail } from "@/hooks/repair/useRepairDetail";
import { useRepairStore } from "@/store/repairStore";

const WritePage = () => {
    const { selectedRepairId } = useRepairStore();
    const { data: repairDetail } = useRepairDetail(selectedRepairId);
    
    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <WriteSection repairDetail={repairDetail} />
                <ButtonSection />
            </div>
        </>
    );
};

export default WritePage;