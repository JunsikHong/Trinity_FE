import { create } from "zustand";
import { persist } from "zustand/middleware";

interface locationState {
    chapter: string | null;
    setChapter: (name: string | null) => void;
    clearChapter: () => void;

    location: Object | null;
    setLocation: (value: Object | null) => void;
    clearLocation: () => void;
}

export const useLocationStore = create<locationState>()(
    persist(
        (set) => ({
            chapter: null,

            setChapter: (name) => 
                set({ 
                    chapter: name ?? null, 
                }),

            clearChapter: () => 
                set({ 
                    chapter: null, 
                }),
            
            location: null,
            
            setLocation: (value) =>
                set({ 
                    location: value ?? null, 
                }),

            clearLocation: () => 
                set({ 
                    location: null, 
                })
        }),
        {
            name: "location-storage",
        }
    )
);