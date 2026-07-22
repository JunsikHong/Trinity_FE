import { useRepairStore } from "@/store/repairStore";
import { useAirplaneStore } from "@/store/airplaneStore";
import { useStatusStore } from "@/store/statusStore";
import ViewPage from "@/pages/home/view/page";
import WritePage from "@/pages/home/write/page";

const AsideSection = () => {
    const { selectedRepairId } = useRepairStore();
    const { selectedAirplaneId } = useAirplaneStore();
    const { status } = useStatusStore();

    return (
        <aside className="flex h-full flex-col border-r bg-white relative">
            {(selectedAirplaneId && selectedRepairId && status == 'view') && <ViewPage/>}
            {(selectedAirplaneId && status == 'edit') && <WritePage/>}
        </aside>
    );
}

export default AsideSection;