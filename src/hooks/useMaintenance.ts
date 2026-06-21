import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import { useAirplaneStore } from "@/store/airplaneStore";

export interface MaintenanceResponse {
    id: number;

    airplaneId: number;
    userId: number;

    chapter: number | null;
    station: number | null;
    waterLine: number | null;
    buttockLine: number | null;
    stringer: number | null;
    frame: number | null;
    rib: number | null;
    wingStation: number | null;
    bodyStation: number | null;

    description: string | null;

    createdAt: string;
    updatedAt: string;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const useMaintenance = () => {
    const selectedAirplaneId = useAirplaneStore(
        (state) => state.selectedAirplaneId
    );

    return useQuery({
        queryKey: ["maintenanceList", selectedAirplaneId],

        enabled: selectedAirplaneId != null,

        queryFn: async () => {
            const { data } = await axiosInstance.get<
                ApiResponse<MaintenanceResponse[]>
            >("/maintenance-report", {
                params: {
                    airplaneId: selectedAirplaneId,
                },
            });

            return data.data;
        },
    });
};