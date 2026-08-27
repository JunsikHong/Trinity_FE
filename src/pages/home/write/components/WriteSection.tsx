// components
import SearchSelect from "@/common/ui/SearchSelect";
import SystemDateInput from "@/common/ui/SystemDateInput";
import SystemTextarea from "@/common/ui/SystemTextarea";
import SystemMultiFile from "@/common/ui/SystemMultiFile";
import RenderLocationGroup from "@/pages/home/write/components/RenderLocationGroup";

import { useEffect } from "react";

// store
import { useLocationStore } from "@/store/locationStore";

const WriteSection = ({ repairChapter, repairLocation, locationValues, chapterId, repairDate, description, files, handleLocationChange, setChapterId, setRepairDate, setDescription, handleFilesChange, handleRemoveFile }: any) => {
    const { chapter, location } = useLocationStore();
    
    useEffect(() => {
        if(!chapter) return;
        const matchedChapter = repairChapter?.find(
            (item:any) => item.chapterName === chapter
        );

        if(matchedChapter) {
            setChapterId(matchedChapter.id);
        }
    }, [chapter, repairChapter]);
    
    return (
        <>
            <div className="space-y-4 m-2 p-3 border rounded-md border-border">
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
                        ...(repairChapter?.map((chapter: any) => ({
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
            <div>
                <SystemMultiFile
                    label="첨부파일"
                    value={files}
                    onAddFiles={handleFilesChange}
                    onRemoveFile={handleRemoveFile}
                />
            </div>
        </>
    );
};

export default WriteSection;