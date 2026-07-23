import { Search } from "lucide-react";

// components
import SearchSelect from "@/common/ui/SearchSelect";
import SearchInput from "@/common/ui/SearchInput";
import SystemDateInput from "@/common/ui/SystemDateInput";

const SearchSection = ({
    searchParams,
    setSearchParams,
    selectedAirplaneId,
    airplaneOptions,
    handleAirplaneChange,
    repairChapter
}: any) => {

    return (
        <div className="space-y-3 border-b py-2 px-2 border rounded-md m-2">
            <SearchSelect
                value={selectedAirplaneId ?? ""}
                options={airplaneOptions}
                onChange={handleAirplaneChange}
                className="w-full"
            />
            <SearchSelect
                value={searchParams.chapterId?.toString() ?? ""}
                onChange={(e) =>
                    setSearchParams((prev) => ({ ...prev, chapterId: Number(e.target.value) }))
                }
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
                        onChange={(e) =>
                            setSearchParams((prev) => ({ ...prev, startDate: e.target.value }))
                        }
                    />
                </div>
                <p className="shrink-0">~</p>
                <div className="flex-1 min-w-0">
                    <SystemDateInput
                        value={searchParams.endDate}
                        onChange={(e) =>
                            setSearchParams((prev) => ({ ...prev, endDate: e.target.value }))
                        }
                    />
                </div>
            </div>
            <div className="flex gap-2">
                <SearchInput
                    value={searchParams.search}
                    onChange={(e) =>
                        setSearchParams((prev) => ({ ...prev, search: e.target.value }))
                    }
                    placeholder="설명, 위치 검색"
                />
                <button
                    className="flex h-10 items-center gap-1 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium hover:bg-slate-50"
                >
                    <Search size={16} />
                    검색
                </button>
            </div>
        </div>
    );
};

export default SearchSection;