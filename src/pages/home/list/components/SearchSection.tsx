import { Search } from "lucide-react";

// components
import SearchSelect from "@/common/ui/SearchSelect";
import SearchInput from "@/common/ui/SearchInput";
import SystemDateInput from "@/common/ui/SystemDateInput";

// store
import { useRepairStore } from "@/store/repairStore";
import { useStatusStore } from "@/store/statusStore";

const SearchSection = ({
    searchKeyword,
    setSearchKeyword,
    searchParams,
    setSearchParams,
    selectedAirplaneId,
    airplaneOptions,
    handleAirplaneChange,
    repairChapter,
}: any) => {

    const { clearSelectedRepair } = useRepairStore();
    const { setStatus } = useStatusStore();

    return (
        <div className="space-y-3 border-b py-2 px-2 border border-border rounded-md m-2">
            <SearchSelect
                value={selectedAirplaneId ?? ""}
                options={airplaneOptions}
                onChange={handleAirplaneChange}
                className="w-full"
            />
            <SearchSelect
                value={searchParams.chapterId?.toString() ?? ""}
                onChange={(value) => {
                    setStatus("");
                    clearSelectedRepair();
                    setSearchParams((prev: any) => ({ ...prev, chapterId: value }));
                }}
                options={[
                    {
                        value: "",
                        label: "챕터 선택",
                    },
                    ...(repairChapter?.map((chapter: any) => ({
                        value: chapter.id.toString(),
                        label: `CHAPTER ${chapter.chapterNumber} : ${chapter.chapterName}`,
                    })) ?? []),
                ]}
                className="w-full uppercase"
            />
            <div className="flex justify-between items-center gap-2">
                <div className="flex-1 min-w-0">
                    <SystemDateInput
                        value={searchParams.startDate}
                        onChange={(e) => {
                            setStatus("");
                            clearSelectedRepair();
                            setSearchParams((prev: any) => ({ ...prev, startDate: e.target.value }));
                        }}
                    />
                </div>
                <p className="shrink-0 text-input-text">~</p>
                <div className="flex-1 min-w-0">
                    <SystemDateInput
                        value={searchParams.endDate}
                        onChange={(e) => {
                            setStatus("");
                            clearSelectedRepair();
                            setSearchParams((prev: any) => ({ ...prev, endDate: e.target.value }));
                        }}
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <SearchInput
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="설명, 위치 검색"
                />
                <button
                    onClick={() => {
                        setStatus("");
                        clearSelectedRepair();
                        setSearchParams((prev: any) => ({ ...prev, search: searchKeyword }));
                    }}
                    className="flex h-10 text-input-text items-center gap-1 rounded-lg border border-input-border bg-input px-4 text-sm font-medium"
                >
                    <Search size={16} />
                    검색
                </button>
            </div>
        </div>
    );
};

export default SearchSection;