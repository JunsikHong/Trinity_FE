import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MaintenanceState {
    selectedMaintenanceId: number | null;
    setSelectedMaintenance: (maintenance: number | null) => void;
    clearSelectedMaintenance: () => void;
}

export const useMaintenanceStore = create<MaintenanceState>()(
    persist(
        (set) => ({
            selectedMaintenanceId: null,

            setSelectedMaintenance: (maintenance) =>
                set({
                    selectedMaintenanceId: maintenance,
                }),

            clearSelectedMaintenance: () =>
                set({
                    selectedMaintenanceId: null,
                }),
        }),
        {
            name: "maintenance-storage",
        }
    )
);