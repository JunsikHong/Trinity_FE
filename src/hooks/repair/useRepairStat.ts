import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";

import type {
    RepairStatResponse,
    RepairStatSearchParams,
} from "@/common/type/repair";

export const useRepairStat = (
    searchParams: RepairStatSearchParams
) => {

    return useQuery({
        queryKey: [
            "repairStat",
            searchParams,
        ],

        queryFn: async () => {
            const { data } = await axiosInstance.get<{
                data: RepairStatResponse;
            }>("/repair/statistics", {
                params: {
                    type: searchParams.type,
                    period: searchParams.period,
                    airplaneTypeId:
                        searchParams.airplaneTypeId || undefined,
                    airplaneId:
                        searchParams.airplaneId || undefined,
                    chapter:
                        searchParams.chapter || undefined,
                },
            });

            return data.data;
        },
    });
};