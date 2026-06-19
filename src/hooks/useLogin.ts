import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { useAuthStore } from "@/store/authStore";
import type { UserRole } from '@/types/auth';

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
        role: UserRole;
    };
}

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