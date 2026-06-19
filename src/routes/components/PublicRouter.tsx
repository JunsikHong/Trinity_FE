import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const PublicRouter = () => {
    const accessToken = useAuthStore((s) => s.accessToken);

    if (accessToken) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};
