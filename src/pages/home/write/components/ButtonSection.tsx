import { Save, Undo } from 'lucide-react';
import { useStatusStore } from "@/store/statusStore";

const ButtonSection = ({ handleSubmit }: any) => {
    const { setStatus } = useStatusStore();
    return (
        <div className="flex gap-3 p-2">
            <button
                onClick={() => setStatus("view")}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
            >
                <Undo size={16} />
                취소
            </button>

            <button
                onClick={handleSubmit}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-blue-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
            >
                <Save size={16} />
                저장
            </button>
        </div>
    );
};

export default ButtonSection;
