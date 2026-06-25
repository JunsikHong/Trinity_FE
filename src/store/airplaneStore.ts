import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useMaintenanceStore } from "./maintenanceStore";

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
                        useMaintenanceStore.getState().clearSelectedMaintenance();
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