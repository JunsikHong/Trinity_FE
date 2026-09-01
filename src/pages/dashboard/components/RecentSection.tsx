import {
    Plane,
    MapPin,
    Clock3,
    ChevronRight,
} from "lucide-react";

type RecentRepair = {
    id: number;
    airplane: string;
    registrationNumber: string;
    chapter: string;
    location: string;
    description: string;
    createdAt: string;
    status: "completed" | "progress";
};

const recentRepairs: RecentRepair[] = [
    {
        id: 1,
        airplane: "B737-800",
        registrationNumber: "HL1234",
        chapter: "32",
        location: "Main Landing Gear",
        description: "Landing Gear 점검 및 부품 교체",
        createdAt: "10분 전",
        status: "completed",
    },
    {
        id: 2,
        airplane: "B737-800",
        registrationNumber: "HL5678",
        chapter: "27",
        location: "Right Wing",
        description: "Flap actuator 이상 확인",
        createdAt: "32분 전",
        status: "progress",
    },
    {
        id: 3,
        airplane: "A320",
        registrationNumber: "HL9012",
        chapter: "24",
        location: "Cockpit",
        description: "Electrical Power system 점검",
        createdAt: "1시간 전",
        status: "completed",
    },
    {
        id: 4,
        airplane: "B777",
        registrationNumber: "HL3456",
        chapter: "21",
        location: "Cabin",
        description: "Air Conditioning system 정비",
        createdAt: "2시간 전",
        status: "completed",
    },
    {
        id: 5,
        airplane: "A350",
        registrationNumber: "HL7890",
        chapter: "49",
        location: "APU",
        description: "APU 시동 이상 점검",
        createdAt: "3시간 전",
        status: "progress",
    },
];

const RecentSection = () => {
    return (
        <section className="rounded-xl border border-slate-200 bg-surface shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <div>
                    <p className="mb-1 text-xs font-medium tracking-wide text-secondary">
                        RECENT ACTIVITY
                    </p>

                    <h2 className="text-lg font-semibold text-primary">
                        최근 정비 기록
                    </h2>
                </div>

                <button
                    type="button"
                    className="
                        flex items-center gap-1
                        text-sm font-medium
                        text-slate-500
                        transition
                        hover:text-blue-600
                    "
                >
                    전체보기
                    <ChevronRight size={16} />
                </button>
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100">
                {recentRepairs.map((repair) => (
                    <div
                        key={repair.id}
                        className="
                            group
                            flex items-center gap-5
                            px-6 py-4
                            transition
                            hover:bg-slate-50
                        "
                    >
                        {/* Icon */}
                        <div
                            className="
                                flex h-10 w-10 shrink-0
                                items-center justify-center
                                rounded-lg
                                bg-blue-50
                                text-blue-600
                            "
                        >
                            <Plane size={18} />
                        </div>

                        {/* Main */}
                        <div className="min-w-0 flex-1">
                            <div className="mb-1 flex items-center gap-2">
                                <span className="text-sm font-semibold text-slate-900">
                                    {repair.registrationNumber}
                                </span>

                                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-medium text-slate-500">
                                    {repair.airplane}
                                </span>

                                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[11px] font-semibold text-blue-600">
                                    CH {repair.chapter}
                                </span>
                            </div>

                            <p className="truncate text-sm text-slate-500">
                                {repair.description}
                            </p>

                            <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                                <span className="flex items-center gap-1">
                                    <MapPin size={12} />
                                    {repair.location}
                                </span>

                                <span className="h-3 w-px bg-slate-200" />

                                <span className="flex items-center gap-1">
                                    <Clock3 size={12} />
                                    {repair.createdAt}
                                </span>
                            </div>
                        </div>

                        {/* Status */}
                        <div className="shrink-0">
                            {repair.status === "completed" ? (
                                <span
                                    className="
                                        rounded-full
                                        bg-emerald-50
                                        px-2.5 py-1
                                        text-xs font-medium
                                        text-emerald-600
                                    "
                                >
                                    완료
                                </span>
                            ) : (
                                <span
                                    className="
                                        rounded-full
                                        bg-amber-50
                                        px-2.5 py-1
                                        text-xs font-medium
                                        text-amber-600
                                    "
                                >
                                    진행중
                                </span>
                            )}
                        </div>

                        {/* Arrow */}
                        <ChevronRight
                            size={17}
                            className="
                                shrink-0
                                text-slate-300
                                transition
                                group-hover:translate-x-0.5
                                group-hover:text-slate-500
                            "
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default RecentSection;