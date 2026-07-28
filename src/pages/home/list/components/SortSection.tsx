import { Calendar, Wrench } from "lucide-react";

const SortSection = ({ 
    searchParams,
    setSearchParams,
    repairListCount
} : any) => {

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
        <div className="flex items-center justify-between border-b border-slate-200 px-2 pt-1">
            <div className="flex items-end">
                <button
                    onClick={() => handleSort("REPAIR_AT")}
                    className={`flex items-center gap-1 rounded-t-md border border-b-0 px-3 py-2 text-sm transition ${
                        isRepair
                            ? "border-blue-500 bg-white font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                            : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                >
                    <Wrench size={15} />
                    수리일 {isRepair && (searchParams.sortDirection === "DESC" ? "↓" : "↑")}
                </button>

                <button
                    onClick={() => handleSort("CREATED_AT")}
                    className={`flex items-center gap-1 rounded-t-md border border-b-0 px-3 py-2 text-sm transition ${
                        isCreated
                            ? "border-blue-500 bg-white font-semibold text-blue-600 shadow-sm hover:bg-blue-50"
                            : "border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                >
                    <Calendar size={15} />
                    작성일 {isCreated && (searchParams.sortDirection === "DESC" ? "↓" : "↑")}
                </button>
            </div>
            <div className="text-sm text-slate-500">
                총 <span className="font-semibold text-slate-800">{repairListCount}</span>건
            </div>
        </div>
    );
};

export default SortSection;