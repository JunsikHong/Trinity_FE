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
        <div className='flex flex-col bg-white rounded-lg'>
            <h2 className='text-slate-700 font-semibold text-sm p-4'>최근 수리이력</h2>
            <table className="w-full border-collapse text-[13px]">
                <thead>
                    <tr className="bg-slate-50">
                        <th className="border-b border-slate-200 px-3 py-2 text-center text-[11px] font-bold text-slate-500">
                            No.
                        </th>
                        <th className="border-b border-slate-200 px-3 py-2 text-center text-[11px] font-bold text-slate-500">
                            위치
                        </th>
                        <th className="border-b border-slate-200 px-3 py-2 text-center text-[11px] font-bold text-slate-500">
                            수리일자
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_DATA.length === 0 ? (
                        <tr>
                            <td
                                colSpan={3}
                                className="py-10 text-sm text-zinc-500"
                            >
                                검색된 구인이 없습니다.
                            </td>
                        </tr>
                        ) : (
                        MOCK_DATA.map((row, index) => (
                            <tr
                                key={row.id}
                                className='cursor-pointer hover:bg-sky-50'
                            >
                                <td className="px-3 py-2 ">
                                    {row.location}
                                </td>
                                <td className="px-3 py-2 ">
                                    {row.title}
                                </td>
                                <td className="px-3 py-2 ">
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