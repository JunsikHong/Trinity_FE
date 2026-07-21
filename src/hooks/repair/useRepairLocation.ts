import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import type { RepairLocationResponse } from "@/common/type/repair";
import type { RepairLocationDetailResponse } from "@/common/type/repair";
import type { RepairLocationDetailRequest } from "@/common/type/repair";

export const useRepairLocation = (
    repairChapterId: number | null | undefined
) => {
    return useQuery({
        queryKey: ["repairLocation", repairChapterId],

        enabled: !!repairChapterId,

        queryFn: async () => {
            const { data } = await axiosInstance.get<
                { data: RepairLocationResponse[] }
            >(`/location/${repairChapterId}`);

            return data.data;
        },
    });
};

export const useRepairLocationList = () => {
    return useQuery({
        queryKey: ["repairLocationList"],

        queryFn: async () => {
            const { data } = await axiosInstance.get<
                { data: RepairLocationDetailResponse[] }
            >(`/location`);

            return data.data;
        },
    });
};

export const useCreateRepairLocation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request: RepairLocationDetailRequest) => {
            const { data } = await axiosInstance.post(
                "/location",
                request
            );

            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["repairLocationList"],
            });
        },
    });
};

export const useUpdateRepairLocation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            request,
        }: {
            id: number;
            request: RepairLocationDetailRequest;
        }) => {
            const { data } = await axiosInstance.put(
                `/location/${id}`,
                request
            );

            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["repairLocationList"],
            });
        },
    });
};

export const useDeleteRepairLocation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await axiosInstance.delete(`/location/${id}`);
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["repairLocationList"],
            });
        },
    });
};