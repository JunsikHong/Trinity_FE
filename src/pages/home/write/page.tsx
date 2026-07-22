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

const WritePage = () => {
    const [chapterId, setChapterId] = useState<number | null>(null);
    const [repairDate, setRepairDate] = useState<string | null>("");
    const [description, setDescription] = useState<string | null>("");
    const [locationValues, setLocationValues] = useState<Record<string, string | number | boolean>>({});

    const { selectedAirplaneTypeId } = useAirplaneStore();
    const { selectedRepairId } = useRepairStore();

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

        if(selectedRepairId) {
            updateRepair.mutate({ id: selectedRepairId, request: payload });
        } else {
            createRepair.mutate(payload);
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

    return (
        <>
            <div className="flex-1 overflow-y-auto">
                <WriteSection
                    repairDetail={repairDetail}
                    repairChapter={repairChapter}
                    repairLocation={repairLocation}
                    chapterId={chapterId}
                    locationValues={locationValues}
                    repairDate={repairDate}
                    description={description}
                    handleLocationChange={handleLocationChange}
                    setChapterId={setChapterId}
                    setRepairDate={setRepairDate}
                    setDescription={setDescription}
                />
                <ButtonSection
                    handleSubmit={handleSubmit}
                />
            </div>
        </>
    );
};

export default WritePage;