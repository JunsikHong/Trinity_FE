import { create } from 'zustand';

interface StateStore {
    isOpenDetail: boolean;
    isOpenWrite: boolean;

    openDetail: () => void;
    closeDetail: () => void;
    openWrite: () => void;
    closeWrite: () => void;
}

const useStateStore = create<StateStore>((set) => ({
    isOpenDetail: false,
    isOpenWrite: false,

    openDetail: () =>
        set({
            isOpenDetail: true,
            isOpenWrite: false
        }),

    closeDetail: () =>
        set({
            isOpenDetail: false,
        }),

    openWrite: () =>
        set({
            isOpenWrite: true,
            isOpenDetail: false
        }),

    closeWrite: () =>
        set({
            isOpenWrite: false,
        }),
}));

export default useStateStore;