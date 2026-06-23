import { MapPin } from "lucide-react";
import { useMaintenanceStore } from "@/store/maintenanceStore";
import useStateStore from "@/store/stateStore";
import type { MaintenanceResponse } from "@/hooks/useMaintenance";

interface ListSectionProps {
    maintenanceList: MaintenanceResponse[];
    isLoading: boolean;
}

const ListSection = ({ maintenanceList, isLoading } : ListSectionProps) => {
    const { selectedMaintenanceId, setSelectedMaintenance, clearSelectedMaintenance } = useMaintenanceStore();
    const { openDetail, closeDetail } = useStateStore();
    const getLocationText = (item: any) => {
        const locations = [];

        if (item.chapter != null)
            locations.push(`CH ${item.chapter}`);
        if (item.station != null)
            locations.push(`STA ${item.station}`);
        if (item.waterLine != null)
            locations.push(`WL ${item.waterLine}`);
        if (item.buttockLine != null)
            locations.push(`BL ${item.buttockLine}`);
        if (item.stringer != null)
            locations.push(`STR ${item.stringer}`);
        if (item.frame != null)
            locations.push(`FR ${item.frame}`);
        if (item.rib != null)
            locations.push(`RIB ${item.rib}`);
        if (item.wingStation != null)
            locations.push(`WS ${item.wingStation}`);
        if (item.bodyStation != null)
            locations.push(`BS ${item.bodyStation}`);

        return locations.join(" / ");
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
            {maintenanceList.map((item) => (
                <button
                    key={item.id}
                    onClick={() => {
                        if(item.id === selectedMaintenanceId) {
                            clearSelectedMaintenance();
                            closeDetail();
                        } else {
                            setSelectedMaintenance(item.id);
                            openDetail();
                        }
                    }}
                    className={`mb-1 flex w-full gap-3 rounded-md border p-3 text-left transition hover:bg-slate-50
                        ${
                            item.id === selectedMaintenanceId
                                ? "bg-blue-50 ring-1 ring-blue-500"
                                : ""
                        }
                    `}
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
                                {new Date(
                                    item.createdAt
                                ).toLocaleDateString()}
                            </span>
                        </div>

                        <p className="line-clamp-1 text-xs text-slate-500">
                            {item.description || "설명 없음"}
                        </p>

                        <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={12} />
                            {getLocationText(item)}
                        </div>
                    </div>
                </button>
            ))}

            {!maintenanceList.length && (
                <div className="py-10 text-center text-sm text-slate-500">
                    등록된 정비 이력이 없습니다.
                </div>
            )}
        </div>
    );
};

export default ListSection;