import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/hooks/axiosInstance";
import { useAuthStore } from "@/store/authStore";
import type { LoginRequest, LoginResponse } from "@/common/type/member/auth";

export const useLogin = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((s) => s.setAuth);

    return useMutation({
        mutationFn: async (credentials: LoginRequest) => {
            const { data } = await axiosInstance.post<{ data: LoginResponse }>(
                '/auth/login',
                credentials
            );
            return data.data;
        },
        onSuccess: ({ accessToken, refreshToken, user }) => {
            setAuth(accessToken, refreshToken, user);
            navigate('/');
        },
    });
};