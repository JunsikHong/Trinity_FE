import SystemDateInput from "@/common/ui/SystemDateInput";
import SystemTextarea from "@/common/ui/SystemTextarea";
import { useState } from "react";
import { Plus } from 'lucide-react';
import { useRepairLocation } from "@/hooks/repair/useRepairLocation";
import type { RepairChapterResponse, RepairDetailResponse } from "@/common/type/repair";
import SearchSelect from "@/common/ui/SearchSelect";
import RenderLocationGroup from "@/pages/home/write/components/RenderLocationGroup";

interface WriteSectionProps {
    repairDetail: RepairDetailResponse | undefined;
    repairChapter: RepairChapterResponse[] | undefined;
}

const WriteSection = ({ repairDetail, repairChapter }: WriteSectionProps) => {

    const [chapterId, setChapterId] = useState<number | null>(null);
    
    const { data: repairLocation } = useRepairLocation(chapterId);
    
    const [locationValues, setLocationValues] = useState<Record<string, string | number | boolean>>({});

    const handleLocationChange = (code: string, value: string | number | boolean) => {
        setLocationValues((prev) => ({ ...prev, [code]: value }));
    };
    
    return (
        <>
            <div className="space-y-4 m-2 p-3 border rounded-md border-slate-200">
                <SearchSelect
                    label="Chapter"
                    onChange={(value) =>
                        setChapterId(value ? Number(value) : null)
                    }
                    options={[
                        {
                            value: "",
                            label: "- 선택 -",
                        },
                        ...(repairChapter?.map((chapter) => ({
                            value: chapter.id.toString(),
                            label: `${chapter.chapterName} (${chapter.chapterNumber})`,
                        })) ?? []),
                    ]}
                    className="w-full"
                />
                <RenderLocationGroup
                    locations={repairLocation}
                    values={locationValues}
                    onChange={handleLocationChange}
                />
                <SystemDateInput
                    label="수리일자"

                />
                <SystemTextarea
                    label="설명"
                    rows={5}
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