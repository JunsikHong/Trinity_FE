export interface RepairLocationItemResponse {
    locationId: number;
    locationName: string;

    chapterId: number;
    chapterNumber: number;
    chapterName: string;

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

export interface RepairDetailResponse extends RepairResponse {
    files: RepairFileResponse[];
}