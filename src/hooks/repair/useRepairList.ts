import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import { useAirplaneStore } from "@/store/airplaneStore";
import type { RepairResponse } from "@/common/type/repair/repair";

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