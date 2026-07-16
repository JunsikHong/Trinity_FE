import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useMember } from "@/hooks/member/useMember";

export const AdminRouter = () => {
    const { accessToken } = useAuthStore();
    const { data: user, isLoading } = useMember();

    if(!accessToken) {
        return <Navigate to="/login" replace />;
    }

    if(isLoading) {
        return null;
    }
    
    if(user?.role !== "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};
