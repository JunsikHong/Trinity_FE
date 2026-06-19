import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";

export interface AirplaneResponse {
    id: number;
    airplaneTypeId: number;
    airplaneTypeName: string;
    registrationNumber: string;
}

export const useAirplane = () => {
    return useQuery({
        queryKey: ["airplane"],
        queryFn: async () => {
            const { data } = await axiosInstance.get<{
                data: AirplaneResponse[];
            }>("/airplane");

            return data.data;
        },
    });
};