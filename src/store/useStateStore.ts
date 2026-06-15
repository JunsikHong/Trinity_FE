import { create } from 'zustand';

interface StateStore {
    isOpenDetail: boolean;
    isOpenWrite: boolean;
    selectedId: string | null;

    openDetail: (id: string) => void;
    closeDetail: () => void;
    openWrite: (id: string) => void;
    closeWrite: () => void;
}

const useStateStore = create<StateStore>((set) => ({
    isOpenDetail: false,
    isOpenWrite: false,
    selectedId: null,

    openDetail: (id) =>
        set({
            isOpenDetail: true,
            selectedId: id,
        }),

    closeDetail: () =>
        set({
            isOpenDetail: false,
            selectedId: null,
        }),

    openWrite: (id) =>
        set({
            isOpenWrite: true,
            selectedId: id,
        }),

    closeWrite: () =>
        set({
            isOpenWrite: false,
        }),
}));

export default useStateStore;