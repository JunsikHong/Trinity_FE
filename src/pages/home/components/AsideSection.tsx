import { useRepairStore } from "@/store/repairStore";
import { useAirplaneStore } from "@/store/airplaneStore";
import ViewPage from "@/pages/home/view/page";
import WritePage from "@/pages/home/write/page";

const AsideSection = () => {
    const { selectedRepairId } = useRepairStore();
    const { selectedAirplaneId } = useAirplaneStore();

    return (
        <aside className="flex h-full flex-col border-r bg-white relative">
            {(selectedAirplaneId && selectedRepairId) && <ViewPage/>}
            {(selectedAirplaneId && !selectedRepairId) && <WritePage/>}
        </aside>
    );
}

export default AsideSection;