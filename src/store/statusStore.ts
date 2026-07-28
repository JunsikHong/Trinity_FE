import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeStatus = "light" | "dark";

interface StatusState {
    status: string | null;
    themeStatus: ThemeStatus;

    setStatus: (status: string | null) => void;
    clearStatus: () => void;

    setThemeStatus: (theme: ThemeStatus) => void;
    toggleThemeStatus: () => void;
}

export const useStatusStore = create<StatusState>()(
    persist(
        (set) => ({
            status: null,
            themeStatus: "light",

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
        }),
        {
            name: "status-storage",
        }
    )
);