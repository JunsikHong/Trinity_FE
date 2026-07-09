import type { UserRole } from "@/common/type/member/role";

export interface User {
    id: number;
    role: UserRole;
}

export interface Member extends User {
    name: string;
    email: string;
    departmentName: string;
}