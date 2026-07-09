import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RepairState {
    selectedRepairId: number | null;
    setSelectedRepair: (repair: number | null) => void;
    clearSelectedRepair: () => void;
}

export const useRepairStore = create<RepairState>()(
    persist(
        (set) => ({
            selectedRepairId: null,

            setSelectedRepair: (repair) =>
                set({
                    selectedRepairId: repair,
                }),

            clearSelectedRepair: () =>
                set({
                    selectedRepairId: null,
                }),
        }),
        {
            name: "repair-storage",
        }
    )
);