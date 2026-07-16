import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import type { AirplaneType } from "@/common/type/airplane";

export const useAirplaneType = () => {
    return useQuery({
        queryKey: ["airplaneType"],
        queryFn: async () => {
            const { data } = await axiosInstance.get<{
                data: AirplaneType[];
            }>("/airplane-type");

            return data.data;
        },
    });
};