import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StatusState {
    status: string | null;
    setStatus: (status: string | null) => void;
    clearStatus: () => void;
}

export const useStatusStore = create<StatusState>()(
    persist(
        (set) => ({
            status: null,

            setStatus: (status) =>
                set(() => {
                    return {
                        status: status ?? null,
                    };
                }),

            clearStatus: () =>
                set({
                    status: null,
                }),
        }),
        {
            name: "status-storage",
        }
    )
);