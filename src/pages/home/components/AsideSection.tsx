import { useMaintenanceStore } from "@/store/maintenanceStore";
import ViewPage from "@/pages/home/view/page";
import WritePage from "@/pages/home/write/page";
import useStateStore from "@/store/stateStore";

const AsideSection = () => {
    const { selectedMaintenanceId } = useMaintenanceStore();
    const { isOpenDetail, isOpenWrite } = useStateStore();
    return (
        <aside className="flex h-full flex-col border-r bg-white relative">
            {(isOpenDetail && selectedMaintenanceId) && <ViewPage/>}
            {(isOpenWrite && !selectedMaintenanceId) && <WritePage/>}
        </aside>
    );
}

export default AsideSection;