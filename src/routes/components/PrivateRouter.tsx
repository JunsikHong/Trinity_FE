import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import type { UserRole } from '@/types/auth';

interface Props {
    allowedRoles? : UserRole[];
}

export const PrivateRouter = ({ allowedRoles }: Props) => {
    const { accessToken, user } = useAuthStore();

    if(!accessToken) {
        return <Navigate to="/login" replace />;
    }

    if(allowedRoles && user && !allowedRoles.includes(user.role)) {
        return <Navigate to ="/403" replace />;
    }

    return <Outlet />;
};
