import useStateStore from '@/store/useStateStore';

const MOCK_DATA: Record<string, any> = {
    "R-2024-00024": {
        id: "R-2024-00024",
        title: "Skin panel dent repair",
        date: "2024-05-20",
        location: "CH 45.0 / STA 320.0",
        chapter: "45.0",
        sta: "320.0",
        stringer: "S-12",
        waterLine: "WL 215.0",
        buttockLine: "BL 180.0",
        wingLine: "WL 0.0",
        description: "Skin panel dent repair",
        creator: "admin",
        createdAt: "2026-05-20 16:30:35",
        photos: []
    },
    "R-2024-00023": {
        id: "R-2024-00023",
        title: "Rivet replacement",
        date: "2024-05-18",
        location: "CH 32.0 / WL 210.0",
        chapter: "32.0",
        sta: "210.0",
        stringer: "S-08",
        waterLine: "WL 210.0",
        buttockLine: "BL 150.0",
        wingLine: "WL 0.0",
        description: "Rivet replacement on wing panel",
        creator: "tech01",
        createdAt: "2026-05-18 14:20:15",
        photos: []
    },
    "R-2024-00022": {
        id: "R-2024-00022",
        title: "Crack repair",
        date: "2024-05-15",
        location: "STA 560.0 / BL 145.0",
        chapter: "55.0",
        sta: "560.0",
        stringer: "S-15",
        waterLine: "WL 180.0",
        buttockLine: "BL 145.0",
        wingLine: "WL 30.0",
        description: "Crack repair on fuselage",
        creator: "tech02",
        createdAt: "2026-05-15 11:45:22",
        photos: []
    }
};

const ViewSection = () => {
    const { selectedId } = useStateStore();
    
    const data = selectedId ? MOCK_DATA[selectedId] : null;

    if (!data) {
        return (
            <div className="flex items-center justify-center h-full text-sm text-slate-400">
                데이터를 불러올 수 없습니다.
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4 m-2 p-3 border rounded-md border-slate-200">
                <div>
                    <p className="text-xs text-slate-600 mb-1">수리번호</p>
                    <p className="text-sm font-medium text-slate-900">{data.id}</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Chapter</p>
                        <p className="text-sm text-slate-900">{data.chapter}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">STA</p>
                        <p className="text-sm text-slate-900">{data.sta}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Stringer</p>
                        <p className="text-sm text-slate-900">{data.stringer}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Water Line</p>
                        <p className="text-sm text-slate-900">{data.waterLine}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Buttock Line</p>
                        <p className="text-sm text-slate-900">{data.buttockLine}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-600 mb-1">Wing Line</p>
                        <p className="text-sm text-slate-900">{data.wingLine}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs text-slate-600 mb-1">수리일자</p>
                    <p className="text-sm text-slate-900">{data.date}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-600 mb-1">설명</p>
                    <p className="text-sm text-slate-900 whitespace-pre-wrap">{data.description}</p>
                </div>
            </div>

            <div className="space-y-4 m-2 p-3 border rounded-md border-slate-200">
                <div>
                    <h3 className="text-sm text-slate-600 mb-3">첨부 사진</h3>
                    {data.photos && data.photos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                            {data.photos.map((photo: string, index: number) => (
                                <img
                                    key={index}
                                    src={photo}
                                    alt={`photo-${index}`}
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
                    <p className="text-xs text-slate-500">{data.creator}</p>
                </div>
                <div className="border border-slate-200 h-4"></div>
                <div className="flex justify-center items-center gap-2">
                    <p className="text-xs text-slate-400 p-1 border border-slate-300 rounded-md">생성일</p>
                    <p className="text-xs text-slate-500">{data.createdAt}</p>
                </div>
            </div>
        </>
    );
};

export default ViewSection;
