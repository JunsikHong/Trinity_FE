import { useMaintenanceStore } from "@/store/maintenanceStore";
import ViewPage from "@/pages/home/view/page";
import WritePage from "@/pages/home/write/page";

const AsideSection = () => {
    const { selectedMaintenanceId } = useMaintenanceStore();
    return (
        <aside className="flex h-full flex-col border-r bg-white relative">
            {selectedMaintenanceId ? <ViewPage/> : <WritePage/>}
        </aside>
    );
}

export default AsideSection;