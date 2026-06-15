import { X } from "lucide-react";
import ViewSection from "@/pages/home/view/components/ViewSection";
import ButtonSection from "@/pages/home/view/components/ButtonSection";
import useStateStore from '@/store/useStateStore';

const ViewPage = () => {
    const { closeDetail } = useStateStore();
    
    return (
        <aside className="flex h-full flex-col border-l bg-white">
            <div className="flex items-center justify-between border-b px-4 py-3">
                <h2 className="font-semibold text-sm">
                    수리이력 상세
                </h2>
                <button onClick={closeDetail}>
                    <X size={18} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <ViewSection />
                <ButtonSection />
            </div>
        </aside>
    );
};

export default ViewPage;
