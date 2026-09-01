import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

type StatType =
    | "all"
    | "airplaneType"
    | "airplane"
    | "chapter";
    

type ChartSectionProps = {
    selectedStat: StatType;
};

const chartData = {
    all: [
        { name: "1월", count: 24 },
        { name: "2월", count: 31 },
        { name: "3월", count: 28 },
        { name: "4월", count: 42 },
        { name: "5월", count: 37 },
        { name: "6월", count: 45 },
    ],

    airplaneType: [
        { name: "B737-800", count: 32 },
        { name: "A320", count: 24 },
        { name: "B777", count: 18 },
        { name: "A350", count: 12 },
    ],

    airplane: [
        { name: "HL1234", count: 18 },
        { name: "HL5678", count: 15 },
        { name: "HL9012", count: 12 },
        { name: "HL3456", count: 9 },
        { name: "HL7890", count: 7 },
    ],

    chapter: [
        { name: "21 - Air Conditioning", count: 14 },
        { name: "24 - Electrical Power", count: 22 },
        { name: "27 - Flight Controls", count: 18 },
        { name: "32 - Landing Gear", count: 27 },
        { name: "49 - Airborne APU", count: 11 },
    ],
};

const chartTitle = {
    all: "전체 정비 현황",
    airplaneType: "기종별 정비 현황",
    airplane: "등록번호별 정비 현황",
    chapter: "Chapter별 정비 현황",
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) {
        return null;
    }

    return (
        <div className="rounded-lg border border-slate-200 bg-surface px-4 py-3 shadow-lg">
            <p className="mb-1 text-xs text-slate-400">
                {label}
            </p>

            <p className="text-sm font-semibold text-slate-800">
                정비 건수{" "}
                <span className="ml-1 text-blue-600">
                    {payload[0].value}건
                </span>
            </p>
        </div>
    );
};

const ChartSection = ({ selectedStat }: ChartSectionProps) => {
    const data = chartData[selectedStat];

    const total = data.reduce(
        (sum, item) => sum + item.count,
        0
    );

    const max = Math.max(...data.map((item) => item.count));


    return (
        <section className="rounded-xl border border-slate-200 bg-surface p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <p className="mb-1 text-xs font-medium text-secondary">
                        MAINTENANCE STATISTICS
                    </p>

                    <h2 className="text-lg font-semibold text-primary">
                        {chartTitle[selectedStat]}
                    </h2>
                </div>

                <div className="text-right">
                    <p className="text-xs text-secondary">
                        Total
                    </p>

                    <p className="text-xl font-bold text-primary">
                        {total}
                        <span className="ml-1 text-sm font-medium text-secondary">
                            건
                        </span>
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[320px] w-full">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <LineChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: -20,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="chartGradient"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopOpacity={0.2}
                                />
                                <stop
                                    offset="100%"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            vertical={false}
                            strokeDasharray="4 4"
                            stroke="#e2e8f0"
                        />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12,
                            }}
                            dy={10}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fill: "#94a3b8",
                                fontSize: 12,
                            }}
                            domain={[
                                0,
                                Math.ceil(max * 1.2),
                            ]}
                        />

                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: "#cbd5e1",
                                strokeDasharray: "4 4",
                            }}
                        />

                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                fill: "#ffffff",
                                stroke: "#2563eb",
                                strokeWidth: 2,
                            }}
                            activeDot={{
                                r: 6,
                                fill: "#2563eb",
                                stroke: "#ffffff",
                                strokeWidth: 3,
                            }}
                            animationDuration={700}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default ChartSection;