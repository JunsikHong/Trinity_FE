import { useState, useEffect, useRef } from "react";
import type { RepairLocationItemResponse } from "@/common/type/repair";

// components
import WriteSection from "@/pages/home/write/components/WriteSection";
import ButtonSection from "@/pages/home/write/components/ButtonSection";

// hooks
import { useRepairDetail, useCreateRepair, useUpdateRepair } from "@/hooks/repair/useRepair";
import { useRepairChapter } from "@/hooks/repair/useRepairChapter";
import { useRepairLocation } from "@/hooks/repair/useRepairLocation";

// store
import { useRepairStore } from "@/store/repairStore";
import { useAirplaneStore } from "@/store/airplaneStore";
import { useModelStore } from "@/store/modelStore";

export interface UploadFile {
    id?: number;
    url: string;
    name: string;
    file?: File;
    isNew: boolean;
}

const WritePage = () => {
    const [chapterId, setChapterId] = useState<number | null>(null);
    const [repairDate, setRepairDate] = useState<string | null>(new Date().toISOString().split("T")[0]);
    const [description, setDescription] = useState<string | null>("");
    const [locationValues, setLocationValues] = useState<Record<string, string | number | boolean>>({});
    const [files, setFiles] = useState<UploadFile[]>([]);
	const [deleteFiles, setDeleteFiles] = useState<number[]>([]);

    const { selectedAirplaneTypeId } = useAirplaneStore();
    const { selectedRepairId } = useRepairStore();
    const { station, stringer } = useModelStore();

    const { data: repairDetail } = useRepairDetail(selectedRepairId);
    const { data: repairChapter } = useRepairChapter(selectedAirplaneTypeId);
    const { data: repairLocation } = useRepairLocation(chapterId);
    const createRepair = useCreateRepair();
    const updateRepair = useUpdateRepair();

    const handleLocationChange = (code: string, value: string | number | boolean) => {
        setLocationValues((prev) => ({ ...prev, [code]: value }));
    };

    const buildLocationPayload = (
        locationValues: Record<number, string | number | boolean>
    ): RepairLocationItemResponse[] => {
        return Object.entries(locationValues)
            .filter(([, value]) => value !== undefined && value !== "")
            .map(([locationId, value]) => ({
                locationId: Number(locationId),
                value: String(value),
            }));
    };

    const handleFilesChange = (selectedFiles: File[]) => {
    	const validFiles: UploadFile[] = [];

    	selectedFiles.forEach((file) => {

    		validFiles.push({
    			file,
    			name: file.name,
    			url: URL.createObjectURL(file),
    			isNew: true,
    		});
    	});

        if (validFiles.length > 0) {
    		setFiles((prev) => [...prev, ...validFiles]);
    	}
    };

    const handleRemoveFile = ({ index, id, isNew }: { index: number; id?: number; isNew: boolean }) => {
    	if (isNew) {
    		const target = files[index];
    		if (target) URL.revokeObjectURL(target.url);
    	} else {
    		if (id !== undefined) {
            	setDeleteFiles(prev => [...prev, id]); // file.id (DB의 실제 id)
        	}
    	}
    	setFiles(prev => prev.filter((_, i) => i !== index));
	};

    const handleSubmit = () => {
        if (!chapterId) {
            alert("Chapter를 선택해주세요.");
            return;
        }

        if (!selectedAirplaneTypeId) {
            alert("항공기 유형을 선택해주세요.");
            return;
        }

        const payload = {
            airplaneId: selectedAirplaneTypeId,
            description: description || null,
            repairAt: repairDate || null,
            locations: buildLocationPayload(locationValues),
        };

        const uploadFiles = files
        .filter((file) => file.isNew && file.file)
        .map((file) => file.file as File);

        if(selectedRepairId) {
            updateRepair.mutate({ id: selectedRepairId, request: payload, files: uploadFiles, deleteFiles: deleteFiles  });
        } else {
            createRepair.mutate({ request: payload, files: uploadFiles });
        }
    };

    const isInitialLoad = useRef(false);

    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            return;
        }
        setLocationValues({});
    }, [chapterId]);

    useEffect(() => {
        if (!repairDetail?.id) return;

        isInitialLoad.current = true;
        setChapterId(repairDetail.locationItems[0]?.chapterId ?? null);
        setRepairDate(repairDetail.repairAt?.split("T")[0] ?? "");
        setDescription(repairDetail.description);

        const initialLocationValues = repairDetail.locationItems.reduce(
            (acc, item) => {
                acc[item.locationId] =
                    item.value === "true"
                        ? true
                        : item.value === "false"
                            ? false
                            : item.value;

                return acc;
            },
            {} as Record<string, string | number | boolean>
        );

        setLocationValues(initialLocationValues);
        setLocationValues(initialLocationValues);
    }, [repairDetail]);

    useEffect(() => {
        
    }, [station, stringer]);

    return (
        <>
            <div className="flex-1 overflow-y-auto bg-surface">
                <WriteSection
                    repairDetail={repairDetail}
                    repairChapter={repairChapter}
                    repairLocation={repairLocation}
                    chapterId={chapterId}
                    locationValues={locationValues}
                    repairDate={repairDate}
                    description={description}
                    files={files}
                    handleLocationChange={handleLocationChange}
                    setChapterId={setChapterId}
                    setRepairDate={setRepairDate}
                    setDescription={setDescription}
                    handleFilesChange={handleFilesChange}
					handleRemoveFile={handleRemoveFile}
                />
                <ButtonSection
                    handleSubmit={handleSubmit}
                />
            </div>
        </>
    );
};

export default WritePage;