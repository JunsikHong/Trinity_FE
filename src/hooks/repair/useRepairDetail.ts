import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import type { RepairDetailResponse } from "@/common/type/repair/repair";

export const useRepairDetail = (
    repairId: number | null | undefined
) => {
    return useQuery({
        queryKey: ["repairDetail", repairId],

        enabled: !!repairId,

        queryFn: async () => {
            const { data } = await axiosInstance.get<
                { data: RepairDetailResponse }
            >(`/repairs/detail/${repairId}`);

            return data.data;
        },
    });
};