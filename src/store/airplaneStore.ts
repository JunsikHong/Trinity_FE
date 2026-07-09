import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useRepairStore } from "@/store/repairStore";

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
                set((state) => {
                    if (state.selectedAirplaneId !== airplane) {
                        useRepairStore.getState().clearSelectedRepair();
                    }

                    return {
                        selectedAirplaneId: airplane,
                    };
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