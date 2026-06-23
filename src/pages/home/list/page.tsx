import { Plus } from "lucide-react";
import { useMaintenance } from "@/hooks/useMaintenance";
import SearchSection from "@/pages/home/list/components/SearchSection";
import ListSection from "@/pages/home/list/components/ListSection";
import useStateStore from "@/store/stateStore";
import { useMaintenanceStore } from "@/store/maintenanceStore";

const ListPage = () => {
    const { data: maintenanceList = [], isLoading } = useMaintenance();
    const { clearSelectedMaintenance } = useMaintenanceStore();
    const { openWrite } = useStateStore();

    return (
        <aside className="flex h-full flex-col border-r bg-white relative">
            <SearchSection maintenanceListCount={maintenanceList.length}/>
            <ListSection maintenanceList={maintenanceList} isLoading={isLoading}/>
            <div className="absolute bottom-6 right-3">
                <button
                    onClick={() => {
                        clearSelectedMaintenance();
                        openWrite();
                    }}
                    className="flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
                >
                    <Plus size={16} />
                    새 수리이력
                </button>
            </div>
        </aside>
    );
};

export default ListPage;