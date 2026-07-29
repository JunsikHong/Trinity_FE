import { useMutation, useQueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import { useAirplaneStore } from "@/store/airplaneStore";
import { useStatusStore } from "@/store/statusStore";
import type { RepairListResponse, RepairDetailResponse, RepairDetailRequest, RepairCursorParam, CursorPageResponse, RepairSearchParams } from "@/common/type/repair/repair";

export const useRepairList = (searchParams: RepairSearchParams) => {
    const selectedAirplaneId = useAirplaneStore(
        (state) => state.selectedAirplaneId
    );

    return useInfiniteQuery({
        queryKey: ["repairList", selectedAirplaneId, searchParams],

        enabled: selectedAirplaneId != null,

        initialPageParam: {} as RepairCursorParam,

        queryFn: async ({ pageParam }) => {
            const { data } = await axiosInstance.get<{
                data: CursorPageResponse<RepairListResponse>;
            }>(`/repair/${selectedAirplaneId}`, {
                params: {
                    search: searchParams.search || undefined,
                    chapterId: searchParams.chapterId,
                    startDate: searchParams.startDate,
                    endDate: searchParams.endDate,
                    sortBy: searchParams.sortBy,
                    sortDirection: searchParams.sortDirection,
                    cursorValue: pageParam.cursorValue,
                    cursorId: pageParam.cursorId,
                    size: 20,
                },
            });

            return data.data;
        },

        getNextPageParam: (lastPage): RepairCursorParam | undefined => {
            if (!lastPage.hasNext) return undefined;
            return {
                cursorValue: lastPage.nextCursorRepairAt ?? undefined,
                cursorId: lastPage.nextCursorId ?? undefined,
            };
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