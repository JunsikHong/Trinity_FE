import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export const useLogout = () => {
    const navigate = useNavigate();
    const clearAuth = useAuthStore((s) => s.clearAuth);

    return () => {
        clearAuth();
        navigate("/login", { replace: true });
    };
};