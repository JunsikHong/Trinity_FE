import WriteSection from "@/pages/home/write/components/WriteSection";
import ButtonSection from "@/pages/home/write/components/ButtonSection";
import { useRepairDetail } from "@/hooks/repair/useRepair";
import { useRepairChapter } from "@/hooks/repair/useRepairChapter";
import { useRepairStore } from "@/store/repairStore";
import { useAirplaneStore } from "@/store/airplaneStore";

const WritePage = () => {
    const { selectedAirplaneTypeId } = useAirplaneStore();
    const { selectedRepairId } = useRepairStore();
    const { data: repairDetail } = useRepairDetail(selectedRepairId);
    const { data: repairChapter } = useRepairChapter(selectedAirplaneTypeId);

    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <WriteSection repairDetail={repairDetail} repairChapter={repairChapter} />
                <ButtonSection />
            </div>
        </>
    );
};

export default WritePage;