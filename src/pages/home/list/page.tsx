import { Plus } from "lucide-react";
import { useRepairList } from "@/hooks/repair/useRepair";
import SearchSection from "@/pages/home/list/components/SearchSection";
import ListSection from "@/pages/home/list/components/ListSection";
import { useRepairStore } from "@/store/repairStore";

const ListPage = () => {
    const { data: repairList = [], isLoading } = useRepairList();
    const { clearSelectedRepair } = useRepairStore();

    return (
        <aside className="flex h-full flex-col border-r bg-white relative">
            <SearchSection repairListCount={repairList.length}/>
            <ListSection repairList={repairList} isLoading={isLoading}/>
            <div className="absolute bottom-6 right-3">
                <button
                    onClick={() => {
                        clearSelectedRepair();
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