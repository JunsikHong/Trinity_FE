import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModelState {
    station : number | null;
    stringer : string | null;
    setStation : (station: number | null) => void;
    setStringer : (stringer: string | null) => void;
}

export const useModelStore = create<ModelState>()(
    persist(
        (set) => ({
            station: null,
            stringer: null,

            setStation: (station) =>
                set({
                    station: station ?? null,
                }),

            setStringer: (stringer) =>
                set({
                    stringer: stringer ?? null,
                }),
        }),
        {
            name: "model-storage",
        }
    )
);