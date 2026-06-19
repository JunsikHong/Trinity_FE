import SearchInput from "@/common/ui/SearchInput";
import SearchSelect from "@/common/ui/SearchSelect";
import { Funnel } from "lucide-react";
import { useState } from "react";
import { useAirplane } from "@/hooks/useAirplane";
import { useAirplaneStore } from "@/store/airplaneStore";

const SearchSection = () => {
    const [keyword, setKeyword] = useState("");
    const { data: airplanes = [] } = useAirplane();
    const { selectedAirplaneId, setSelectedAirplane } = useAirplaneStore();
    const options = [
        { value: "", label: "항공기 선택" },
        ...airplanes.map((airplane) => ({
            value: airplane.id,
            label: airplane.registrationNumber + " (" + airplane.airplaneTypeName + ")",
        })),
    ];

    const handleAirplaneChange = (value: string) => {
        if (!value) {
            setSelectedAirplane(null);
            return;
        }

        const airplane = airplanes.find(
            (item) => item.id === Number(value)
        );

        if (!airplane) return;

        setSelectedAirplane(airplane.id);
    };

    return (
        <div className="space-y-3 border-b py-4 px-3">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold text-sm ml-1">
                    수리이력 목록
                </h2>
            </div>
            <SearchSelect
                value={selectedAirplaneId ?? ""}
                options={options}
                onChange={handleAirplaneChange}
                className="w-full"
            />
            <div className="flex gap-2">
                <SearchInput
                    value={keyword}
                    placeholder="설명, 위치 검색"
                />
                <button
                    className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium hover:bg-slate-50"
                >
                    <Funnel size={16} />
                    (24건)
                </button>
            </div>
        </div>
    );
};

export default SearchSection;