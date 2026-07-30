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
  description: string;
  repairAt: string;
  createdAt: string;
  updatedAt: string;
  locationItems: {
    locationId: number;
    locationName: string;
    locationCode: string;
    chapterId: number;
    chapterNumber: number;
    chapterName: string;
    value: string;
  }[];
}

export interface CursorPageResponse<T> {
  content: T[];
  hasNext: boolean;
  nextCursorRepairAt: string | null;
  nextCursorId: number | null;
}

export interface RepairCursorParam {
  cursorRepairAt?: string;
  cursorId?: number;
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

export interface CreateRepairPayload {
    request: RepairDetailRequest;
    files?: File[];
}

export interface UpdateRepairPayload {
    id: number;
    request: RepairDetailRequest;
    files?: File[];
    deleteFiles?: number[];
}

export interface RepairDetailRequest {
    airplaneId: number;
    description: string | null;
    repairAt: string | null;
    locations: RepairLocationItemRequest[];
}

export type RepairSortBy = "REPAIR_AT" | "CREATED_AT";
export type RepairSortDirection = "ASC" | "DESC";

export interface RepairSearchParams {
  search?: string;
  chapterId?: number;
  startDate?: string | null; // "YYYY-MM-DD"
  endDate?: string | null;   // "YYYY-MM-DD"
  sortBy: RepairSortBy;
  sortDirection: RepairSortDirection;
}

export interface RepairCursorParam {
  cursorValue?: string;
  cursorId?: number;
}