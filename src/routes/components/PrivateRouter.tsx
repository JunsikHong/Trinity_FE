import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export const PrivateRouter = () => {
    const { accessToken } = useAuthStore();

    if(!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
