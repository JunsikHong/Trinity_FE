import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import { useAirplaneStore } from "@/store/airplaneStore";
import type { RepairResponse } from "@/common/type/repair/repair";
import type { RepairDetailResponse } from "@/common/type/repair/repair";

export const useRepairList = () => {
    const selectedAirplaneId = useAirplaneStore(
        (state) => state.selectedAirplaneId
    );

    return useQuery({
        queryKey: ["repairList", selectedAirplaneId],

        enabled: selectedAirplaneId != null,

        queryFn: async () => {
            const { data } = await axiosInstance.get<
                {data : RepairResponse[] }
            >(`/repair/${selectedAirplaneId}`);

            return data.data;
        },
    });
};

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