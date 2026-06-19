import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import { useAirplaneStore } from "@/store/airplaneStore";

export interface MaintenanceResponse {
    id: number;
    userId: string;
    airplaneId: string;
    chapter: string;
    station: string;
    waterLine: string;
    buttockLine: string;
    stringer: string;
    frame: string;
    rib: string;
    wingStation: string;
    bodyStation: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export const useMaintenance = () => {
    const selectedAirplaneId = useAirplaneStore(
        (state) => state.selectedAirplaneId
    );

    return useQuery({
        queryKey: ["maintenanceList", selectedAirplaneId],

        enabled: !!selectedAirplaneId,

        queryFn: async () => {
            const { data } = await axiosInstance.get<{
                data: MaintenanceResponse[];
            }>(
                `/maintenance-reports?airplaneId=${selectedAirplaneId}`
            );

            return data.data;
        },
    });
};