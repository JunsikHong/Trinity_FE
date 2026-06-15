import { X } from "lucide-react";

import WriteSection from "@/pages/home/write/components/WriteSection";

const WritePage = () => {
    return (
        <aside
            className="
                flex
                h-full
                w-[360px]
                flex-col
                border-l
                bg-white
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-between
                    border-b
                    px-4
                    py-3
                "
            >
                <h2 className="font-semibold text-sm">
                    수리이력 상세
                </h2>

                <button>
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                <WriteSection/>
            </div>
        </aside>
    );
};

export default WritePage;