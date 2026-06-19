import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserRole } from '@/types/auth';

interface AuthUser {
    id : number,
    role: UserRole;
}

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    user: AuthUser | null;
    setAuth: (
        accessToken: string, 
        refreshToken: string, 
        user: AuthUser
    ) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>() (
    persist((set) => ({
        accessToken: null,
        refreshToken: null,
        user: null,

        setAuth: (accessToken, refreshToken, user) => 
            set({ accessToken, refreshToken, user }),

        clearAuth: () => 
            set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
        name: 'auth-storage'
    }
));