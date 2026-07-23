import { Plus } from 'lucide-react';

// components
import SearchSelect from "@/common/ui/SearchSelect";
import SystemDateInput from "@/common/ui/SystemDateInput";
import SystemTextarea from "@/common/ui/SystemTextarea";
import RenderLocationGroup from "@/pages/home/write/components/RenderLocationGroup";

const WriteSection = ({ repairChapter, repairLocation, locationValues, chapterId, repairDate, description, handleLocationChange, setChapterId, setRepairDate, setDescription } : any) => {
    return (
        <>
            <div className="space-y-4 m-2 p-3 border rounded-md border-slate-200">
                <SearchSelect
                    label="CHAPTER"
                    value={chapterId?.toString() ?? ""}
                    onChange={(value) =>
                        setChapterId(value ? Number(value) : null)
                    }
                    options={[
                        {
                            value: "",
                            label: "챕터 선택",
                        },
                        ...(repairChapter?.map((chapter : any) => ({
                            value: chapter.id.toString(),
                            label: `CHAPTER ${chapter.chapterNumber} : ${chapter.chapterName}`,
                        })) ?? []),
                    ]}
                    className="w-full uppercase"
                />
                <RenderLocationGroup
                    locations={repairLocation}
                    values={locationValues}
                    onChange={handleLocationChange}
                />
                <SystemDateInput
                    label="DATE"
                    value={repairDate}
                    onChange={(e) => setRepairDate(e.target.value)}
                />
                <SystemTextarea
                    label='CONTENT'
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="space-y-4 m-2 p-3 border rounded-md border-slate-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-sm text-slate-600">첨부 사진</h3>
                    <button
                        className="flex h-8 items-center gap-1 rounded-md border text-slate-600 border-slate-200 bg-white px-2 font-medium hover:bg-slate-50 text-xs"
                    >
                        <Plus size={16} /> 사진 추가
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="col-span-2">
                        <div className="border border-slate-300 h-16 rounded-lg flex items-center justify-center text-sm text-slate-400">
                            사진을 첨부해주세요.
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WriteSection;