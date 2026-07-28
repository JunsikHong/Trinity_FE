import { useState, useMemo } from "react";
import type { RepairSearchParams } from "@/common/type/repair";

// components
import SearchSection from "@/pages/home/list/components/SearchSection";
import SortSection from "@/pages/home/list/components/SortSection";
import ListSection from "@/pages/home/list/components/ListSection";

// store
import { useAirplaneStore } from "@/store/airplaneStore";

// hooks
import { useRepairList } from "@/hooks/repair/useRepair";
import { useAirplane } from "@/hooks/airplane/useAirplane";
import { useRepairChapter } from "@/hooks/repair/useRepairChapter";

const ListPage = () => {

    // 수리 리스트
    const [searchKeyword, setSearchKeyword] = useState("");
    const [searchParams, setSearchParams] = useState<RepairSearchParams>({
        search: "",
        chapterId: undefined,
        startDate: undefined,
        endDate: undefined,
        sortBy: "REPAIR_AT",
        sortDirection: "DESC",
    });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useRepairList(searchParams);
    const repairList = useMemo(
        () => data?.pages.flatMap((page) => page.content) ?? [],
        [data]
    );

    // 항공기 리스트
    const { selectedAirplaneTypeId, selectedAirplaneId, setSelectedAirplane } = useAirplaneStore();

    const { data: airplanes = [] } = useAirplane();
    const airplaneOptions = useMemo(
        () => [
            { value: "", label: "항공기 선택" },
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

    // 챕터 리스트
    const { data: repairChapter } = useRepairChapter(selectedAirplaneTypeId);

    return (
        <aside className="flex h-full flex-col border-r bg-white relative">
            <SearchSection
                searchKeyword={searchKeyword}
                setSearchKeyword={setSearchKeyword}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                selectedAirplaneId={selectedAirplaneId} 
                airplaneOptions={airplaneOptions} 
                handleAirplaneChange={handleAirplaneChange}
                repairChapter={repairChapter}
            />
            <SortSection
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                repairListCount={repairList.length}
            />
            <ListSection 
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                repairList={repairList} 
                isLoading={isLoading} 
            />
        </aside>
    );
};

export default ListPage;