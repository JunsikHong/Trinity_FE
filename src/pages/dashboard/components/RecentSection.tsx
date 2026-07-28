const RecentSection = () => {
    const MOCK_DATA = [
        {
            id: "R-2024-00024",
            title: "Skin panel dent repair",
            date: "2024-05-20",
            location: "CH 45.0 / STA 320.0",
            color: "bg-red-500",
            thumbnail: "https://placehold.co/80x60/f8fafc/e2e8f0?text=CH",
        },
        {
            id: "R-2024-00023",
            title: "Rivet replacement",
            date: "2024-05-18",
            location: "CH 32.0 / WL 210.0",
            color: "bg-amber-500",
            thumbnail: "https://placehold.co/80x60/f8fafc/e2e8f0?text=WL",
        },
        {
            id: "R-2024-00022",
            title: "Crack repair",
            date: "2024-05-15",
            location: "STA 560.0 / BL 145.0",
            color: "bg-green-500",
            thumbnail: "https://placehold.co/80x60/f8fafc/e2e8f0?text=BL",
        },
        {
            id: "R-2024-00021",
            title: "Stringer repair",
            date: "2024-05-10",
            location: "CH 18.0 / STA 120.0",
            color: "bg-blue-500",
            thumbnail: "https://placehold.co/80x60/f8fafc/e2e8f0?text=STR",
        },
        {
            id: "R-2024-00020",
            title: "Corrosion treatment",
            date: "2024-05-08",
            location: "WL 180.0 / BL 220.0",
            color: "bg-emerald-500",
            thumbnail: "https://placehold.co/80x60/f8fafc/e2e8f0?text=COR",
        },
    ];

    return (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div>
                    <h2 className="text-base font-semibold text-primary">
                        최근 수리 이력
                    </h2>
                    <p className="mt-0.5 text-xs text-secondary">
                        최근 등록된 수리 기록입니다.
                    </p>
                </div>

                <span className="rounded-full bg-page px-3 py-1 text-xs font-medium text-secondary">
                    {MOCK_DATA.length}건
                </span>
            </div>

            <table className="w-full text-sm">
                <thead className="bg-page">
                    <tr className="border-b border-border">
                        <th className="w-16 px-5 py-3 text-center text-xs font-semibold text-muted">
                            No.
                        </th>

                        <th className="px-5 py-3 text-left text-xs font-semibold text-muted">
                            위치
                        </th>

                        <th className="w-36 px-5 py-3 text-center text-xs font-semibold text-muted">
                            수리일
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {MOCK_DATA.length === 0 ? (
                        <tr>
                            <td
                                colSpan={3}
                                className="py-12 text-center text-sm text-secondary"
                            >
                                최근 수리 이력이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        MOCK_DATA.map((row, index) => (
                            <tr
                                key={row.id}
                                className="cursor-pointer border-b border-border transition-colors last:border-0 hover:bg-page"
                            >
                                <td className="px-5 py-4 text-center">
                                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-page px-2 text-xs font-semibold text-secondary">
                                        {index + 1}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    <div className="font-medium text-primary">
                                        {row.location}
                                    </div>

                                    <div className="mt-1 text-xs text-secondary">
                                        {row.title}
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-center text-secondary">
                                    {row.date}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default RecentSection;