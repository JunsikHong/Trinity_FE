import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeStatus = "light" | "dark";

interface StatusState {
    status: string | null;
    themeStatus: ThemeStatus;
    listWidth: number | null;
    viewWidth: number | null;

    setStatus: (status: string | null) => void;
    clearStatus: () => void;

    setThemeStatus: (theme: ThemeStatus) => void;
    toggleThemeStatus: () => void;

    setListWidth: (width: number | null) => void;
    setViewWidth: (width: number | null) => void;
}

export const useStatusStore = create<StatusState>()(
    persist(
        (set) => ({
            status: null,
            themeStatus: "light",
            listWidth: 25,
            viewWidth: 25,

            setStatus: (status) =>
                set({
                    status: status ?? null,
                }),

            clearStatus: () =>
                set({
                    status: null,
                }),

            setThemeStatus: (theme) => {
                document.documentElement.classList.toggle("dark", theme === "dark");

                set({
                    themeStatus: theme,
                });
            },

            toggleThemeStatus: () =>
                set((state) => {
                    const next =
                        state.themeStatus === "light" ? "dark" : "light";

                    document.documentElement.classList.toggle(
                        "dark",
                        next === "dark"
                    );

                    return {
                        themeStatus: next,
                    };
                }),

            setListWidth: (width) => 
                set({
                    listWidth: width ?? null,
                }),

            setViewWidth: (width) => 
                set({
                    viewWidth: width ?? null,
                }),
        }),
        {
            name: "status-storage",
        }
    )
);