import { useEffect, useRef } from "react";
import { MapPin, Camera, FileText } from "lucide-react";
import { useRepairStore } from "@/store/repairStore";
import { useStatusStore } from "@/store/statusStore";
import type { RepairListResponse, RepairLocationItemListResponse } from "@/common/type/repair";

interface ListSectionProps {
    repairList: RepairListResponse[];
    isLoading: boolean;
    fetchNextPage: () => void;
    hasNextPage?: boolean;
    isFetchingNextPage: boolean;
}

const ListSection = ({ fetchNextPage, hasNextPage, isFetchingNextPage, repairList, isLoading }: ListSectionProps) => {
    const { setStatus, clearStatus } = useStatusStore();
    const { selectedRepairId, setSelectedRepair, clearSelectedRepair } = useRepairStore();

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    fetchNextPage();
                }
            },
            {
                root: null,
                rootMargin: "150px",
                threshold: 0,
            }
        );

        const target = loadMoreRef.current;

        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) {
        return (
            <div className="relative flex-1 overflow-y-auto p-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="mb-2 flex w-full rounded-md border animate-pulse"
                    >
                        <div className="h-28 w-28 shrink-0 bg-slate-200" />
                        <div className="flex-1 p-2">
                            <div className="flex items-center justify-between">
                                <div className="h-4 w-24 rounded bg-slate-200" />
                                <div className="h-3 w-16 rounded bg-slate-200" />
                            </div>
                            <div className="mt-3 h-3 w-40 rounded bg-slate-200" />
                            <div className="mt-2 space-y-2">
                                <div className="h-3 w-full rounded bg-slate-200" />
                                <div className="h-3 w-3/4 rounded bg-slate-200" />
                            </div>
                            <div className="mt-4 h-3 w-5/6 rounded bg-slate-200" />
                        </div>
                    </div>
                ))}
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
                    className={`mb-2 overflow-hidden bg-card flex w-full border border-border text-left transition hover:ring-1 hover:ring-blue-500 rounded-md ${item.id === selectedRepairId
                        ? "ring-2 ring-blue-500"
                        : ""
                        }`}
                >
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center bg-slate-200">
                        <Camera className="h-6 w-6 text-slate-400" strokeWidth={1.5} />
                    </div>

                    <div className="min-w-0 flex-1 mt-2 flex flex-col">
                        <div className="flex items-start justify-between px-2">
                            <span className="text-sm font-semibold text-primary">
                                CODE : #{item.id}
                            </span>
                            <span className="text-xs text-secondary">
                                {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="mt-1 flex items-start gap-1 text-xs text-secondary px-2 uppercase">
                            <p>
                                CHAPTER {item.locationItems[0].chapterNumber} : {item.locationItems[0].chapterName}
                            </p>
                        </div>
                        <div className="mt-1 flex items-start gap-1 text-xs text-secondary px-2">
                            <MapPin
                                size={12}
                                className="mt-0.5 shrink-0"
                            />
                            <div>
                                <div className="line-clamp-2">
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

                                        const staStr = Object.entries(groups)
                                            .filter(([code]) => code === "STA" || code === "STR")
                                            .map(([code, items]) => {
                                                const values = items.map((v) => v.value);

                                                return values.length > 1
                                                    ? `${code} ${values[0]} ~ ${values[values.length - 1]}`
                                                    : `${code} ${values[0]}`;
                                            });

                                        const others = Object.entries(groups)
                                            .filter(([code]) => code !== "STA" && code !== "STR")
                                            .map(([code, items]) => {
                                                return items
                                                    .map((v) =>
                                                        v.value === "true"
                                                            ? v.locationName
                                                            : `${v.locationName} ${v.value}`
                                                    )
                                                    .join(" / ");
                                            });


                                        return (
                                            <>
                                                {[
                                                    ...staStr,
                                                    others.join(" / ")
                                                ]
                                                    .filter(Boolean)
                                                    .map((text, index) => (
                                                        <div key={index}>
                                                            {text}
                                                        </div>
                                                    ))}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                        <p className="mt-auto flex items-center gap-1 px-2 pb-2 text-xs text-secondary">
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

            {hasNextPage && <div ref={loadMoreRef} className="h-8" />}

            {isFetchingNextPage && (
                <div className="py-3 text-center text-sm text-slate-500">
                    불러오는 중...
                </div>
            )}
        </div>
    );
};

export default ListSection;