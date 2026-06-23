import type { MaintenanceDetailResponse } from "@/hooks/useMaintenanceDetail";

interface DetailSectionProps {
    maintenanceDetail: MaintenanceDetailResponse | undefined;
    isLoading: boolean;
}

const ViewSection = ({ maintenanceDetail , isLoading } : DetailSectionProps) => {

    if (isLoading) {
        return (
            <div className="flex-1 p-4 text-sm text-slate-500">
                정비 이력을 불러오는 중...
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4 m-2 p-3 border rounded-md border-slate-200">
                <div>
                    <p className="text-xs text-slate-600 mb-1">수리번호</p>
                    <p className="text-sm font-medium text-slate-900">{maintenanceDetail?.id}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Chapter</p>
                        <p className="text-sm text-slate-900">{maintenanceDetail?.chapter}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">STA</p>
                        <p className="text-sm text-slate-900">{maintenanceDetail?.station}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Stringer</p>
                        <p className="text-sm text-slate-900">{maintenanceDetail?.stringer}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Water Line</p>
                        <p className="text-sm text-slate-900">{maintenanceDetail?.waterLine}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Buttock Line</p>
                        <p className="text-sm text-slate-900">{maintenanceDetail?.buttockLine}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Wing Line</p>
                        <p className="text-sm text-slate-900">{maintenanceDetail?.wingStation}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs text-slate-600 mb-1">수리일자</p>
                    <p className="text-sm text-slate-900">{maintenanceDetail?.createdAt}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-600 mb-1">설명</p>
                    <p className="text-sm text-slate-900 whitespace-pre-wrap">{maintenanceDetail?.description}</p>
                </div>
            </div>

            <div className="space-y-4 m-2 p-3 border rounded-md border-slate-200">
                <div>
                    <h3 className="text-sm text-slate-600 mb-3">첨부 사진</h3>
                    {maintenanceDetail?.files && maintenanceDetail.files.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                            {maintenanceDetail.files.map((file) => (
                                <img
                                    key={file.id}
                                    src={file.filePath}
                                    alt={file.originalName}
                                    className="w-full h-24 rounded-lg object-cover border border-slate-200"
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="border border-slate-300 h-16 rounded-lg flex items-center justify-center text-sm text-slate-400">
                            첨부된 사진이 없습니다.
                        </div>
                    )}
                </div>
            </div>

            <div className="flex px-3 py-1 gap-3 items-center">
                <div className="flex justify-center items-center gap-2">
                    <p className="text-xs text-slate-400 p-1 border border-slate-300 rounded-md">생성자</p>
                    <p className="text-xs text-slate-500">{maintenanceDetail?.userId}</p>
                </div>
                <div className="border border-slate-200 h-4"></div>
                <div className="flex justify-center items-center gap-2">
                    <p className="text-xs text-slate-400 p-1 border border-slate-300 rounded-md">생성일</p>
                    <p className="text-xs text-slate-500">{maintenanceDetail?.createdAt}</p>
                </div>
            </div>
        </>
    );
};

export default ViewSection;
