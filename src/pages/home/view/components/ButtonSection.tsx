import { Trash2, Edit2 } from "lucide-react";
import { useDeleteRepair } from "@/hooks/repair/useRepair";
import { useRepairStore } from "@/store/repairStore";
import { useStatusStore } from "@/store/statusStore";

const ButtonSection = ({ selectedRepairId }: any) => {

    const deleteRepair = useDeleteRepair();
    const { clearSelectedRepair } = useRepairStore();
    const { setStatus } = useStatusStore();

    const handleDelete = () => {
        if (!confirm("삭제하시겠습니까?")) return;
        deleteRepair.mutate(selectedRepairId);
        clearSelectedRepair();
    };

    const handleEdit = () => {
        setStatus('edit');
    };

    return (
        <div className="flex gap-3 p-3">
            <button
                onClick={handleDelete}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50"
            >
                <Trash2 size={16} />
                삭제
            </button>

            <button
                onClick={handleEdit}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-blue-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
                <Edit2 size={16} />
                수정
            </button>
        </div>
    );
};

export default ButtonSection;
