import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/hooks/axiosInstance";
import type { Member } from "@/common/type/member";

export const useMember = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const { data } = await axiosInstance.get<{
                data: Member;
            }>("/user/me");

            return data.data;
        },
    });
};