import { Funnel } from "lucide-react";
import { useState, useMemo } from "react";

// hooks
import { useAirplane } from "@/hooks/airplane/useAirplane";
import { useRepairChapter } from "@/hooks/repair/useRepairChapter";

// store
import { useAirplaneStore } from "@/store/airplaneStore";

// components
import SearchSelect from "@/common/ui/SearchSelect";
import SearchInput from "@/common/ui/SearchInput";
import SystemDateInput from "@/common/ui/SystemDateInput";

interface SearchSectionProps {
    repairListCount: number;
}

const SearchSection = ({ repairListCount }: SearchSectionProps) => {

    const [filterOpen, setFilterOpen] = useState(false);

    // 검색
    const [search, setSearch] = useState("");
    const [chapterId, setChapterId] = useState<number | null>(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const { data: airplanes = [] } = useAirplane();
    const { selectedAirplaneTypeId, selectedAirplaneId, setSelectedAirplane } = useAirplaneStore();
    const { data: repairChapter } = useRepairChapter(selectedAirplaneTypeId);

    const airplaneOptions = useMemo(
        () => [
            { value: "", label: "선택" },
            ...airplanes.map((airplane) => ({
                value: airplane.id.toString(),
                label: `${airplane.registrationNumber} (${airplane.airplaneTypeName})`,
            })),
        ],
        [airplanes]
    );

    const handleAirplaneChange = (value: string) => {
        if (!value) {
            setSelectedAirplane(null);
            return;
        }

        const airplane = airplanes.find(
            (item) => item.id === Number(value)
        );

        if (!airplane) return;

        setSelectedAirplane(airplane);
    };

    return (
        <div className="space-y-3 border-b py-4 px-3">
            <SearchSelect
                label="항공기"
                value={selectedAirplaneId ?? ""}
                options={airplaneOptions}
                onChange={handleAirplaneChange}
                className="w-full"
            />
            <div className="flex gap-2">
                <SearchInput
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="설명, 위치 검색"
                />
                <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium hover:bg-slate-50"
                >
                    <Funnel size={16} />
                    ({repairListCount}건)
                </button>
            </div>

            {filterOpen && (
                <>
                    <SearchSelect
                        value={chapterId?.toString() ?? ""}
                        onChange={(value) =>
                            setChapterId(value ? Number(value) : null)
                        }
                        options={[
                            {
                                value: "",
                                label: "-선택-",
                            },
                            ...(repairChapter?.map((chapter: any) => ({
                                value: chapter.id.toString(),
                                label: `${chapter.chapterName} (${chapter.chapterNumber})`,
                            })) ?? []),
                        ]}
                        className="w-full"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <SystemDateInput
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                        <SystemDateInput
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default SearchSection;