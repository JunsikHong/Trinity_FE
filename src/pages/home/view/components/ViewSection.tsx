import type { RepairDetailResponse, RepairLocationItemListResponse } from "@/common/type/repair";
import ImageGallery from "@/common/ux/ImageGallery";

interface DetailSectionProps {
    repairDetail: RepairDetailResponse | undefined;
    isLoading: boolean;
}

const ViewSection = ({
    repairDetail,
    isLoading,
}: DetailSectionProps) => {
    if (isLoading) {
        return (
            <>
                <div className="m-2 animate-pulse rounded-xl border border-slate-200 bg-white">
                    <div className="border-b p-3">
                        <div className="h-3 w-20 rounded bg-slate-200" />

                        <div className="mt-3 flex items-center gap-2">
                            <div className="h-6 w-28 rounded-md bg-slate-200" />
                            <div className="h-5 w-40 rounded bg-slate-200" />
                        </div>
                    </div>
                    <div className="space-y-5 p-3">
                        <div>
                            <div className="mb-2 h-3 w-16 rounded bg-slate-200" />

                            <div className="flex flex-wrap gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-9 w-28 rounded-lg bg-slate-200"
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 h-3 w-20 rounded bg-slate-200" />

                            <div className="h-[120px] rounded-lg bg-slate-200" />
                        </div>
                    </div>
                </div>
                <div className="m-2 animate-pulse rounded-md border border-slate-200 p-3">
                    <div className="mb-3 h-4 w-20 rounded bg-slate-200" />

                    <div className="grid grid-cols-2 gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square rounded-lg bg-slate-200"
                            />
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 px-2 py-1 animate-pulse">
                    {[1, 2].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="h-6 w-12 rounded bg-slate-200" />
                            <div className="h-4 w-20 rounded bg-slate-200" />
                        </div>
                    ))}
                </div>
            </>
        );
    }

    if (!repairDetail) {
        return (
            <div className="flex-1 p-4 text-sm text-slate-500">
                정비 이력을 선택해주세요.
            </div>
        );
    }

    return (
        <>
            <div className="m-2 rounded-xl border border-border">
                <div className="border-b border-border p-3 flex items-center justify-between gap-2">
                    <p className="text-sm uppercase tracking-wider text-primary font-semibold">
                        Code #{repairDetail.id}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="rounded-md bg-icon px-2 py-1 text-xs font-bold text-icon-text flex gap-1 justify-center items-center">
                            CHAPTER {repairDetail.locationItems[0].chapterNumber}
                            <span className="text-xs font-semibold text-primary uppercase">
                                {repairDetail.locationItems[0].chapterName}
                            </span>
                        </span>
                    </div>
                </div>
                <div className="space-y-5 p-3">
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                            Location
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {(() => {
                                const groups = repairDetail.locationItems.reduce(
                                    (acc, cur) => {
                                        if (!acc[cur.locationCode]) {
                                            acc[cur.locationCode] = [];
                                        }
                                        acc[cur.locationCode].push(cur);
                                        return acc;
                                    },
                                    {} as Record<string, RepairLocationItemListResponse[]>
                                );

                                return Object.entries(groups).map(([code, items]) => {
                                    let text = "";

                                    if (code === "STA" || code === "STR") {
                                        const values = items.map((v) => v.value);

                                        text =
                                            values.length > 1
                                                ? `${code} ${values[0]} ~ ${values[values.length - 1]}`
                                                : `${code} ${values[0]}`;
                                    } else {
                                        text = items
                                            .map((v) =>
                                                v.value === "true"
                                                    ? v.locationName
                                                    : `${v.locationName} ${v.value}`
                                            )
                                            .join(" / ");
                                    }

                                    return (
                                        <div
                                            key={code}
                                            className="rounded-lg border border-border bg-icon px-3 py-2 text-sm font-medium text-icon-text"
                                        >
                                            {text}
                                        </div>
                                    );
                                });
                            })()}
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                            Description
                        </p>

                        <div className="rounded-lg border border-border bg-icon px-3 py-2 text-sm text-icon-text min-h-[120px]">
                            {repairDetail.description || "설명이 없습니다."}
                        </div>
                    </div>
                </div>
            </div>
            {repairDetail.files.length > 0 && (
                <ImageGallery
                    images={repairDetail.files}
                />
            )}
            <div className="grid grid-cols-2 px-2 py-1">
                <div className="flex items-center gap-2">
                    <p className="rounded-md border border-border p-1 text-xs text-primary">
                        수리일
                    </p>

                    <p className="text-xs text-secondary">
                        {repairDetail.repairAt
                            ? repairDetail.repairAt.slice(0, 10)
                            : "-"}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="rounded-md border border-border p-1 text-xs text-primary">
                        생성일
                    </p>

                    <p className="text-xs text-secondary">
                        {repairDetail.createdAt
                            ? repairDetail.createdAt.slice(0, 10)
                            : "-"}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ViewSection;