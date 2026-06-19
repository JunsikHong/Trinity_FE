import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (err: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if(token) resolve(token);
        else reject(error);
    });
    failedQueue = [];
}

axiosInstance.interceptors.response.use(
    (response) => response,
    async(error) => {
        const originalRequest = error.config;
        if(error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if(originalRequest.url?.includes('/auth/refresh')) {
            useAuthStore.getState().clearAuth();
            window.location.href = '/login';
            return Promise.reject(error);
        }

        if(isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosInstance(originalRequest));
                    },
                    reject,
                });
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const { refreshToken } = useAuthStore.getState();
            const { data } = await axiosInstance.post('/auth/refresh', {
                refreshToken,
            });

            const newAccessToken = data.data.accessToken;
            useAuthStore.getState().setAuth(
                newAccessToken,
                data.data.refreshToken ?? refreshToken!,
                useAuthStore.getState().user!
            );

            processQueue(null, newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
        } catch(refreshError) {
            processQueue(refreshError, null);
            useAuthStore.getState().clearAuth();
            window.location.href = '/login';
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

export default axiosInstance;