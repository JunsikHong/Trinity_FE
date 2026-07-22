import { MapPin, Camera, FileText } from "lucide-react";
import { useRepairStore } from "@/store/repairStore";
import { useStatusStore } from "@/store/statusStore";
import type { RepairListResponse, RepairLocationItemListResponse } from "@/common/type/repair";

interface ListSectionProps {
    repairList: RepairListResponse[];
    isLoading: boolean;
}
const ListSection = ({ repairList, isLoading }: ListSectionProps) => {
    const { setStatus, clearStatus } = useStatusStore();
    const { selectedRepairId, setSelectedRepair, clearSelectedRepair } = useRepairStore();

    if (isLoading) {
        return (
            <div className="flex-1 p-4 text-sm text-slate-500">
                정비 이력을 불러오는 중...
            </div>
        );
    }

    return (
        <div className="relative flex-1 overflow-y-auto p-2">
            {repairList.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        if (item.id === selectedRepairId) {
                            clearStatus();
                            clearSelectedRepair();
                        } else {
                            setStatus('view');
                            setSelectedRepair(item.id);
                        }
                    }}
                    className={`mb-2 flex w-full border text-left transition hover:ring-1 hover:ring-blue-500 rounded-md ${item.id === selectedRepairId
                        ? "ring-1 ring-blue-500"
                        : ""
                        }`}
                >
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center bg-slate-100">
                        <Camera className="h-6 w-6 text-slate-400" strokeWidth={1.5} />
                    </div>

                    <div className="min-w-0 flex-1 mt-2">
                        <div className="flex items-start justify-between px-2">
                            <span className="text-sm font-semibold">
                                CODE : #{item.id}
                            </span>
                            <span className="text-xs text-slate-400">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="mt-1 flex items-start gap-1 text-xs text-slate-500 px-2">
                            <MapPin
                                size={12}
                                className="mt-0.5 shrink-0"
                            />
                            <div>
                                <p>
                                    CHAPTER : {item.locationItems[0].chapterName} ({item.locationItems[0].chapterNumber})
                                </p>
                                <span className="line-clamp-1">
                                    {(() => {
                                        const groups = item.locationItems.reduce(
                                            (acc, cur) => {
                                                if (!acc[cur.locationCode]) {
                                                    acc[cur.locationCode] = [];
                                                }
                                                acc[cur.locationCode].push(cur);
                                                return acc;
                                            },
                                            {} as Record<string, RepairLocationItemListResponse[]>
                                        );

                                        return Object.entries(groups)
                                            .map(([code, items]) => {
                                                if (code === "STA" || code === "STR") {
                                                    const values = items.map((v) => v.value);

                                                    return values.length > 1
                                                        ? `${code} ${values[0]} ~ ${values[values.length - 1]}`
                                                        : `${code} ${values[0]}`;
                                                }

                                                return items
                                                    .map((v) =>
                                                        v.value === "true"
                                                            ? v.locationName
                                                            : `${v.locationName} ${v.value}`
                                                    )
                                                    .join(" / ");
                                            })
                                            .join(" / ");
                                    })()}
                                </span>
                            </div>
                        </div>
                        <p className="mt-3 flex items-center gap-1 px-2 text-xs text-slate-500">
                            <FileText size={12} className="shrink-0" />
                            <span className="line-clamp-1">
                                {item.description || "-"}
                            </span>
                        </p>
                    </div>
                </button>
            ))}
            {!repairList.length && (
                <div className="py-10 text-center text-sm text-slate-500">
                    등록된 정비 이력이 없습니다.
                </div>
            )}
        </div>
    );
};

export default ListSection;