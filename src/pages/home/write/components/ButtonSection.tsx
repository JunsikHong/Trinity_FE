import { Save, Undo } from 'lucide-react';
import { useStatusStore } from "@/store/statusStore";

const ButtonSection = ({ handleSubmit }: any) => {
    const { setStatus } = useStatusStore();
    return (
        <div className="flex gap-3 p-2">
            <button
                onClick={() => setStatus("view")}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-icon hover:bg-icon-hover text-sm font-medium text-secondary transition"
            >
                <Undo size={16} />
                취소
            </button>

            <button
                onClick={handleSubmit}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-icon hover:bg-icon-hover text-sm font-medium text-primaryBtn transition"
            >
                <Save size={16} />
                저장
            </button>
        </div>
    );
};

export default ButtonSection;
