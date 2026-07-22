import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import { useAirplaneStore } from "@/store/airplaneStore";
import { useStatusStore } from "@/store/statusStore";
import type { RepairListResponse, RepairDetailResponse, RepairDetailRequest } from "@/common/type/repair/repair";

export const useRepairList = () => {
    const selectedAirplaneId = useAirplaneStore(
        (state) => state.selectedAirplaneId
    );

    return useQuery({
        queryKey: ["repairList", selectedAirplaneId],

        enabled: selectedAirplaneId != null,

        queryFn: async () => {
            const { data } = await axiosInstance.get<
                {data : RepairListResponse[] }
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
            >(`/repair/detail/${repairId}`);

            return data.data;
        },
    });
};

export const useCreateRepair = () => {
    const selectedAirplaneId = useAirplaneStore(
        (state) => state.selectedAirplaneId
    );
    const { setStatus } = useStatusStore();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (request: RepairDetailRequest) => {
            const { data } = await axiosInstance.post(
                "/repair",
                request
            );

            return data;
        },

        onSuccess: () => {
            setStatus('view');
            queryClient.invalidateQueries({
                queryKey: ["repairList", selectedAirplaneId],
            });
        },
    });
};

export const useUpdateRepair = () => {
    const selectedAirplaneId = useAirplaneStore(
        (state) => state.selectedAirplaneId
    );
    const { setStatus } = useStatusStore();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            request,
        }: {
            id: number;
            request: RepairDetailRequest;
        }) => {
            const { data } = await axiosInstance.put(
                `/repair/${id}`,
                request
            );

            return data;
        },

        onSuccess: () => {
            setStatus('view');
            queryClient.invalidateQueries({
                queryKey: ["repairList", selectedAirplaneId],
            });
        },
    });
};

export const useDeleteRepair = () => {
    const selectedAirplaneId = useAirplaneStore(
        (state) => state.selectedAirplaneId
    );
    const { clearStatus } = useStatusStore();

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const { data } = await axiosInstance.delete(`/repair/${id}`);
            return data;
        },

        onSuccess: () => {
            clearStatus();
            queryClient.invalidateQueries({
                queryKey: ["repairList", selectedAirplaneId],
            });
        },
    });
};