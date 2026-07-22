export type RepairLocationResponse = {
    id: number;
    name: string;
    code: string;
    section: string;
    inputType: string;
    inputDescription: string;
    sortOrder: number;
};

export type RepairLocationDetailResponse = {
    id: number;
    repairChapterId: number;
    repairChapterNumber: number;
    repairChapterName: string;
    airplaneTypeId: number;
    airplaneTypeName: string;
    name: string;
    code: string;
    section: string;
    inputType: string;
    inputDescription: string;
    sortOrder: number;
    isActive: boolean;
};

export type RepairLocationDetailRequest = {
    repairChapterId: number;
    name: string;
    code: string;
    section: string;
    inputType: string;
    inputDescription: string;
    sortOrder: number;
    isActive: boolean;
};