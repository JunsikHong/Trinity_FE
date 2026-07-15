import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import type { RepairLocationResponse } from "@/common/type/repair";

export const useRepairLocation = (
    repairChapterId: number | null | undefined
) => {
    return useQuery({
        queryKey: ["repairLocation", repairChapterId],

        enabled: !!repairChapterId,

        queryFn: async () => {
            const { data } = await axiosInstance.get<
                { data: RepairLocationResponse[] }
            >(`/location/${repairChapterId}`);

            return data.data;
        },
    });
};