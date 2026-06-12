import { create } from 'zustand';

interface StateStore {
    isOpenDetail: boolean;
    detailList: number[];
    isOpenWrite: boolean;
    selectedId: number | null;

    openDetail: (id: number) => void;
    closeDetail: () => void;
    openWrite: () => void;
    closeWrite: () => void;
    putDetailList: (id: number) => void;
    deleteDetailList: (id: number) => void;
}

const useStateStore = create<StateStore>((set) => ({
    isOpenDetail: false,
    isOpenWrite: false,
    selectedId: null,

    detailList: [],

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

    openWrite: () =>
        set({
            isOpenWrite: true,
        }),

    closeWrite: () =>
        set({
            isOpenWrite: false,
        }),

    putDetailList: (id) =>
        set((state) => ({
            detailList: [...state.detailList, id],
        })),

    deleteDetailList: (id) =>
        set((state) => ({
            detailList: state.detailList.filter((item) => item !== id),
        })),   
}));

export default useStateStore;