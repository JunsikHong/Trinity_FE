import {
    Calendar,
    MapPin,
} from "lucide-react";

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
    {
        id: "R-2024-00019",
        title: "Skin replacement",
        date: "2024-05-05",
        location: "CH 55.0 / STA 610.0",
        color: "bg-pink-500",
        thumbnail: "https://placehold.co/80x60/f8fafc/e2e8f0?text=SKN",
    },
    {
        id: "R-2024-00018",
        title: "Door frame repair",
        date: "2024-05-02",
        location: "STA 280.0",
        color: "bg-violet-500",
        thumbnail: "https://placehold.co/80x60/f8fafc/e2e8f0?text=DR",
    },
    {
        id: "R-2024-00017",
        title: "Wing fairing repair",
        date: "2024-04-28",
        location: "WL 75.0",
        color: "bg-cyan-500",
        thumbnail: "https://placehold.co/80x60/f8fafc/e2e8f0?text=WG",
    },
];

const ListSection = () => {
    return (
        <div className="flex-1 overflow-y-auto relative">
            {MOCK_DATA.map((item, index) => (
                <button
                    key={item.id}
                    className={`
                        flex
                        w-full
                        gap-3
                        border-b
                        p-3
                        text-left
                        transition
                        hover:bg-slate-50
                        ${
                            index === 0
                                ? "bg-blue-50 ring-1 ring-blue-500"
                                : ""
                        }
                    `}
                >
                    <img
                        src={item.thumbnail}
                        alt={item.id}
                        className="
                            h-16
                            w-20
                            shrink-0
                            rounded-md
                            border
                            object-cover
                        "
                    />
                    <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <span className="text-sm font-semibold">
                                {item.id}
                            </span>
                            <span className="text-xs text-slate-400">
                                {item.date}
                            </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-slate-700">
                            {item.title}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin size={12} />
                            {item.location}
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default ListSection;