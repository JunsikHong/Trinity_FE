import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";

export interface MaintenanceFileResponse {
    id: number;
    originalName: string;
    filePath: string;
    extension: string;
    mimeType: string;
    size: number;
    createdAt: string;
}

export interface MaintenanceDetailResponse {
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

    files: MaintenanceFileResponse[];
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export const useMaintenanceDetail = (
    maintenanceId: number | null | undefined
) => {
    return useQuery({
        queryKey: ["maintenanceDetail", maintenanceId],

        enabled: !!maintenanceId,

        queryFn: async () => {
            const { data } = await axiosInstance.get<
                ApiResponse<MaintenanceDetailResponse>
            >(`/maintenance-report/${maintenanceId}`);

            return data.data;
        },
    });
};