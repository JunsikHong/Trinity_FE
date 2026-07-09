import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import type { Airplane } from "@/common/type/airplane";

export const useAirplane = () => {
    return useQuery({
        queryKey: ["airplane"],
        queryFn: async () => {
            const { data } = await axiosInstance.get<{
                data: Airplane[];
            }>("/airplane");

            return data.data;
        },
    });
};