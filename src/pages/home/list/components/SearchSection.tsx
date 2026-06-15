import SearchInput from "@/common/ui/SearchInput";
import { Funnel } from "lucide-react";
import { useState } from "react";

const SearchSection = () => {
    const [keyword, setKeyword] = useState("");
    return (
        <div className="space-y-3 border-b py-4 px-3">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm ml-1">
                    수리이력 목록
                </h2>
            </div>
            <div className="flex gap-2">
                <SearchInput
                    value={keyword}
                    placeholder="설명, 위치 검색"
                />
                <button
                    className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium hover:bg-slate-50"
                >
                    <Funnel size={16} />
                    (24건)
                </button>
            </div>
        </div>
    );
};

export default SearchSection;