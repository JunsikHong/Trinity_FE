export interface RepairLocationItemListResponse {
    locationId: number;
    locationName: string;
    locationCode: string;
    chapterId: number;
    chapterNumber: number;
    chapterName: string;
    value: string;
}

export interface RepairListResponse {
    id: number;
    description: string | null;
    repairAt: string | null;
    createdAt: string;
    updatedAt: string;
    locationItems: RepairLocationItemListResponse[];
}

export interface RepairDetailResponse {
    id: number;
    description: string | null;
    repairAt: string | null;
    createdAt: string;
    updatedAt: string;
    locationItems: RepairLocationItemListResponse[];
}

export interface RepairLocationItemResponse {
    locationId: number;
    value: string;
}

export interface RepairResponse {
    id: number;

    description: string | null;

    repairAt: string | null;
    createdAt: string;
    updatedAt: string;

    locations: RepairLocationItemResponse[];
}

export interface RepairFileResponse {
    id: number;
    originalName: string;
    filePath: string;
    extension: string;
    mimeType: string;
    size: number;
    createdAt: string;
}

export interface RepairLocationItemRequest {
    locationId: number;
    value: string;
}

export interface RepairDetailRequest {
    airplaneId: number;
    description: string | null;
    repairAt: string | null;
    locations: RepairLocationItemRequest[];
}