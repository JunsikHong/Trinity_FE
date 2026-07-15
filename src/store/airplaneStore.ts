import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useRepairStore } from "@/store/repairStore";
import type { Airplane } from "@/common/type/airplane";

interface AirplaneState {
    selectedAirplaneTypeId: number | null;
    selectedAirplaneId: number | null;
    setSelectedAirplane: (airplane: Airplane | null) => void;
    clearSelectedAirplane: () => void;
}

export const useAirplaneStore = create<AirplaneState>()(
    persist(
        (set) => ({
            selectedAirplaneId: null,
            selectedAirplaneTypeId: null,

            setSelectedAirplane: (airplane) =>
                set((state) => {
                    if (state.selectedAirplaneId !== airplane?.id) {
                        useRepairStore.getState().clearSelectedRepair();
                    }

                    return {
                        selectedAirplaneId: airplane?.id ?? null,
                        selectedAirplaneTypeId: airplane?.airplaneTypeId ?? null
                    };
                }),

            clearSelectedAirplane: () =>
                set({
                    selectedAirplaneId: null,
                    selectedAirplaneTypeId: null,
                }),
        }),
        {
            name: "airplane-storage",
        }
    )
);