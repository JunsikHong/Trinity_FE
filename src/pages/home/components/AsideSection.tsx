import { useRepairStore } from "@/store/repairStore";
import { useAirplaneStore } from "@/store/airplaneStore";
import { useStatusStore } from "@/store/statusStore";
import ViewPage from "@/pages/home/view/page";
import WritePage from "@/pages/home/write/page";
import { CirclePlus } from "lucide-react";


const AsideSection = () => {
    const { clearSelectedRepair } = useRepairStore();
    const { selectedAirplaneId } = useAirplaneStore();
    const { status, setStatus } = useStatusStore();

    const handleAdd = () => {
        if (!selectedAirplaneId) {
            alert("정비이력을 추가할 항공기를 선택해주세요.");
            return;
        }
        clearSelectedRepair();
        setStatus("edit");
    }

    return (
        <aside className="flex h-full flex-col relative">
            {(selectedAirplaneId && status == 'view') && <ViewPage />}
            {(selectedAirplaneId && status == 'edit') && <WritePage />}
            {(!status) && (
                <div
                    onClick={handleAdd}
                    className="w-full h-full flex flex-col justify-center items-center bg-surface text-secondary gap-1 cursor-pointer"
                >
                    <CirclePlus className="h-16 w-16" />
                    <p className="font-bold text-secondary">정비이력 추가</p>
                </div>
            )}

        </aside>
    );
}

export default AsideSection;