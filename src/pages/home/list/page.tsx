import { Plus } from "lucide-react";

// components
import SearchSection from "@/pages/home/list/components/SearchSection";
import ListSection from "@/pages/home/list/components/ListSection";

// hooks
import { useRepairList } from "@/hooks/repair/useRepair";

// store
import { useRepairStore } from "@/store/repairStore";
import { useStatusStore } from "@/store/statusStore";

const ListPage = () => {
    const { data: repairList = [], isLoading } = useRepairList();
    const { clearSelectedRepair } = useRepairStore();
    const { setStatus } = useStatusStore();

    return (
        <aside className="flex h-full flex-col border-r bg-white relative">
            <SearchSection repairListCount={repairList.length}/>
            <ListSection repairList={repairList} isLoading={isLoading}/>
            <div className="absolute bottom-6 right-3">
                <button
                    onClick={() => {
                        clearSelectedRepair();
                        setStatus('edit');
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