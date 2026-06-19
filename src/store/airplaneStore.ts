import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AirplaneState {
    selectedAirplaneId: number | null;
    setSelectedAirplane: (airplane: number | null) => void;
    clearSelectedAirplane: () => void;
}

export const useAirplaneStore = create<AirplaneState>()(
    persist(
        (set) => ({
            selectedAirplaneId: null,

            setSelectedAirplane: (airplane) =>
                set({
                    selectedAirplaneId: airplane,
                }),

            clearSelectedAirplane: () =>
                set({
                    selectedAirplaneId: null,
                }),
        }),
        {
            name: "airplane-storage",
        }
    )
);