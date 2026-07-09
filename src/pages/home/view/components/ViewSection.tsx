import type { RepairDetailResponse } from "@/common/type/repair";

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
            <div className="flex-1 p-4 text-sm text-slate-500">
                정비 이력을 불러오는 중...
            </div>
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
            <div className="m-2 space-y-4 rounded-md border border-slate-200 p-3">
                <div>
                    <p className="mb-1 text-xs text-slate-600">수리번호</p>
                    <p className="text-sm font-medium text-slate-900">
                        #{repairDetail.id}
                    </p>
                </div>

                <div>
                    <p className="mb-2 text-xs text-slate-600">수리 위치</p>

                    <div className="space-y-2">
                        {repairDetail.locations.map((location) => (
                            <div
                                key={location.locationId}
                                className="rounded-md border border-slate-200 bg-slate-50 p-3"
                            >
                                <p className="text-sm font-medium text-slate-900">
                                    CH {location.chapterNumber}{" "}
                                    {location.chapterName}
                                </p>

                                <p className="mt-1 text-sm text-slate-700">
                                    {location.locationName}
                                    {location.value
                                        ? ` : ${location.value}`
                                        : ""}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <p className="mb-1 text-xs text-slate-600">수리일자</p>
                    <p className="text-sm text-slate-900">
                        {repairDetail.repairAt
                            ? new Date(
                                  repairDetail.repairAt
                              ).toLocaleString()
                            : "-"}
                    </p>
                </div>

                <div>
                    <p className="mb-1 text-xs text-slate-600">설명</p>
                    <p className="whitespace-pre-wrap text-sm text-slate-900">
                        {repairDetail.description || "설명이 없습니다."}
                    </p>
                </div>
            </div>

            <div className="m-2 space-y-4 rounded-md border border-slate-200 p-3">
                <div>
                    <h3 className="mb-3 text-sm text-slate-600">
                        첨부 사진
                    </h3>

                    {repairDetail.files.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                            {repairDetail.files.map((file) => (
                                <img
                                    key={file.id}
                                    src={file.filePath}
                                    alt={file.originalName}
                                    className="h-24 w-full rounded-lg border border-slate-200 object-cover"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex h-16 items-center justify-center rounded-lg border border-slate-300 text-sm text-slate-400">
                            첨부된 사진이 없습니다.
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 px-3 py-1">
                <div className="flex items-center gap-2">
                    <p className="rounded-md border border-slate-300 p-1 text-xs text-slate-400">
                        생성일
                    </p>

                    <p className="text-xs text-slate-500">
                        {new Date(
                            repairDetail.createdAt
                        ).toLocaleString()}
                    </p>
                </div>

                <div className="h-4 border border-slate-200"></div>

                <div className="flex items-center gap-2">
                    <p className="rounded-md border border-slate-300 p-1 text-xs text-slate-400">
                        수정일
                    </p>

                    <p className="text-xs text-slate-500">
                        {new Date(
                            repairDetail.updatedAt
                        ).toLocaleString()}
                    </p>
                </div>
            </div>
        </>
    );
};

export default ViewSection;