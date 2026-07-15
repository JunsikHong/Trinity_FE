import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import type { RepairChapterResponse } from "@/common/type/repair";

export const useRepairChapter = (
    airplaneTypeId: number | null | undefined
) => {
    return useQuery({
        queryKey: ["repairChapter", airplaneTypeId],

        enabled: !!airplaneTypeId,

        queryFn: async () => {
            const { data } = await axiosInstance.get<
                { data: RepairChapterResponse[] }
            >(`/chapter/${airplaneTypeId}`);

            return data.data;
        },
    });
};