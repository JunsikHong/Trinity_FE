import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

const data = [
    { month: "Jan", count: 18 },
    { month: "Feb", count: 23 },
    { month: "Mar", count: 15 },
    { month: "Apr", count: 27 },
    { month: "May", count: 31 },
    { month: "Jun", count: 20 },
];

const ChartSection = () => {
    return (
        <>
            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="count"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>
        </>
    );
}

export default ChartSection;