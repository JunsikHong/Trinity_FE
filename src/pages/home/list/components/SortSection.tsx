import { Calendar, Wrench } from "lucide-react";

const SortSection = ({ 
    searchParams,
    setSearchParams,
    repairListCount
} : any) => {
    return (
        <div className="flex items-center justify-between border-b border-slate-200 px-2 pt-1">
            <div className="flex items-end">
                <button className="flex items-center gap-1 rounded-t-md  border border-b-0 border-blue-500 bg-white px-3 py-2 text-sm font-semibold text-blue-600 shadow-sm transition hover:bg-blue-50">
                    <Wrench size={15} />
                    수리일
                </button>
                <button className="flex items-center gap-1 rounded-t-md border border-b-0 border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
                    <Calendar size={15} />
                    작성일
                </button>
            </div>
            <div className="text-sm text-slate-500">
                총 <span className="font-semibold text-slate-800">{repairListCount}</span>건
            </div>
        </div>
    );
};

export default SortSection;