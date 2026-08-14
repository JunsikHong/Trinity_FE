import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeStatus = "light" | "dark";

interface StatusState {
    status: string | null;
    setStatus: (status: string | null) => void;
    clearStatus: () => void;

    themeStatus: ThemeStatus;
    setThemeStatus: (theme: ThemeStatus) => void;
    toggleThemeStatus: () => void;

    chapterName: string | null;
    setChapterName: (name: string | null) => void;
    clearChapterName: () => void;

    locationValue: Object | null;
    setLocationValue: (value: Object | null) => void;
    clearLocationValue: () => void;
}

export const useStatusStore = create<StatusState>()(
    persist(
        (set) => ({
            status: null,
            setStatus: (status) =>
                set({ status: status ?? null, }),
            clearStatus: () =>
                set({ status: null, }),

            themeStatus: "light",
            setThemeStatus: (theme) => {
                document.documentElement.classList.toggle("dark", theme === "dark");
                set({ themeStatus: theme, });
            },
            toggleThemeStatus: () =>
                set((state) => {
                    const next = state.themeStatus === "light" ? "dark" : "light"; 
                    document.documentElement.classList.toggle("dark", next === "dark");
                    return { themeStatus: next, };
            }),

            chapterName: null,
            setChapterName: (name) => 
                set({ chapterName: name ?? null, }),
            clearChapterName: () => 
                set({ chapterName: null, }),

            locationValue: null,
            setLocationValue: (value) =>
                set({ locationValue: value ?? null, }),
            clearLocationValue: () => 
                set({ locationValue: null, })

        }),
        {
            name: "status-storage",
        }
    )
);