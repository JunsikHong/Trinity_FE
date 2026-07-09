import { MapPin } from "lucide-react";
import { useRepairStore } from "@/store/repairStore";
import type { RepairResponse } from "@/common/type/repair";

interface ListSectionProps {
    repairList: RepairResponse[];
    isLoading: boolean;
}
const ListSection = ({ repairList, isLoading }: ListSectionProps) => {
    const {
        selectedRepairId,
        setSelectedRepair,
        clearSelectedRepair,
    } = useRepairStore();

    const getLocationText = (item: RepairResponse) => {
        return item.locations
            .map(
                (location) =>
                    `CH ${location.chapterNumber} ${location.chapterName} : ${location.locationName} ${location.value}`
            )
            .join(" / ");
    };

    if (isLoading) {
        return (
            <div className="flex-1 p-4 text-sm text-slate-500">
                정비 이력을 불러오는 중...
            </div>
        );
    }

    return (
        <div className="relative flex-1 overflow-y-auto p-3">
            {repairList.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        if (item.id === selectedRepairId) {
                            clearSelectedRepair();
                        } else {
                            setSelectedRepair(item.id);
                        }
                    }}
                    className={`mb-1 flex w-full gap-3 rounded-md border p-3 text-left transition hover:bg-slate-50 ${
                        item.id === selectedRepairId
                            ? "bg-blue-50 ring-1 ring-blue-500"
                            : ""
                    }`}
                >
                    <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-md border bg-slate-100">
                        <MapPin size={24} />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between">
                            <span className="text-sm font-semibold">
                                #{item.id}
                            </span>

                            <span className="text-xs text-slate-400">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <p className="line-clamp-1 text-xs text-slate-500">
                            {item.description || "설명 없음"}
                        </p>

                        <div className="mt-3 flex items-start gap-1 text-xs text-slate-500">
                            <MapPin
                                size={12}
                                className="mt-0.5 shrink-0"
                            />
                            <span className="line-clamp-2">
                                {getLocationText(item)}
                            </span>
                        </div>
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