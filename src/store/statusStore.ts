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

    tool: string | null;
    setTool: (tool: string | null) => void;

    zoom: number | null;
    setZoom: (zoom: number | null) => void;

    zoomAction: string | null;
    setZoomAction: (zoomAction: string | null) => void;
    clearZoomAction: () => void;
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

            tool: "select",
            setTool: (tool) =>
                set({ tool: tool ?? null, }),

            zoom: 0,
            setZoom: (zoom) =>
                set({ zoom: zoom ?? null, }),

            zoomAction: "",
            setZoomAction: (zoomAction) =>
                set({ zoomAction: zoomAction ?? null, }),
            clearZoomAction: () =>
                set({ zoomAction: null, }),
            
        }),
        {
            name: "status-storage",
        }
    )
);