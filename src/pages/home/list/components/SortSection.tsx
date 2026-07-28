import { Calendar, Wrench } from "lucide-react";

const SortSection = ({
    searchParams,
    setSearchParams,
    repairListCount
}: any) => {

    const handleSort = (sortBy: "REPAIR_AT" | "CREATED_AT") => {
        setSearchParams((prev: any) => ({
            ...prev,
            sortBy,
            sortDirection:
                prev.sortBy === sortBy
                    ? prev.sortDirection === "DESC"
                        ? "ASC"
                        : "DESC"
                    : "DESC",
        }));
    };

    const isRepair = searchParams.sortBy === "REPAIR_AT";
    const isCreated = searchParams.sortBy === "CREATED_AT";

    return (
        <div className="flex items-center justify-between border-b border-border px-2 pt-1">
            <div className="flex items-end">
                <button
                    onClick={() => handleSort("REPAIR_AT")}
                    className={`flex items-center gap-1 rounded-t-md border border-b-0 px-3 py-2 text-sm transition-colors ${isRepair
                            ? "border-tab-activeBorder bg-tab-active text-tab-activeText font-semibold shadow-sm"
                            : "border-tab-border bg-tab text-tab-text hover:bg-tab-hover hover:text-primary"
                        }`}
                >
                    <Wrench size={15} />
                    수리일 {isRepair && (searchParams.sortDirection === "DESC" ? "↓" : "↑")}
                </button>

                <button
                    onClick={() => handleSort("CREATED_AT")}
                    className={`flex items-center gap-1 rounded-t-md border border-b-0 px-3 py-2 text-sm transition-colors ${isRepair
                            ? "border-tab-border bg-tab text-tab-text hover:bg-tab-hover hover:text-primary"
                            : "border-tab-activeBorder bg-tab-active text-tab-activeText font-semibold shadow-sm"
                        }`}
                >
                    <Calendar size={15} />
                    작성일 {isCreated && (searchParams.sortDirection === "DESC" ? "↓" : "↑")}
                </button>
            </div>
            <div className="text-sm text-secondary">
                총 <span className="font-semibold text-primary">{repairListCount}</span>건
            </div>
        </div>
    );
};

export default SortSection;