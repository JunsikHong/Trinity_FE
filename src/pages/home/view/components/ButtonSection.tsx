import { Trash2, Edit2 } from "lucide-react";
import { useDeleteRepair } from "@/hooks/repair/useRepair";
import { useRepairStore } from "@/store/repairStore";
import { useStatusStore } from "@/store/statusStore";

const ButtonSection = ({ selectedRepairId } : any) => {

    const deleteRepair = useDeleteRepair();
    const { clearSelectedRepair } = useRepairStore();
    const { setStatus } = useStatusStore();

    const handleDelete = () => {
        if(!confirm("삭제하시겠습니까?")) return;
        deleteRepair.mutate(selectedRepairId);
        clearSelectedRepair();
    };

    const handleEdit = () => {
        setStatus('edit');
    };

    return (
        <div className="flex gap-2 p-3">
            <button
                onClick={handleDelete}
                className="flex-1 h-10 rounded-md bg-red-100 text-red-600 border-red-400 border font-medium text-sm hover:bg-red-600 transition flex items-center justify-center gap-2"
            >
                <Trash2 size={16} />
                삭제
            </button>
            <button
                onClick={handleEdit}
                className="flex-1 h-10 rounded-md bg-blue-100 text-blue-600 border-blue-400 border font-medium text-sm hover:bg-blue-600 transition flex items-center justify-center gap-2"
            >
                <Edit2 size={16} />
                수정
            </button>
        </div>
    );
};

export default ButtonSection;
