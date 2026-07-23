import {
    LayoutDashboard,
    Wrench,
    Users,
    Settings,
} from "lucide-react";

export const MENUS = [
    {
        title: "회원관리",
        icon: Users,
        path: "/member",
    },
    {
        title: "대시보드",
        icon: LayoutDashboard,
        path: "/",
    },
    {
        title: "정비관리",
        icon: Wrench,
        path: "/repair",
    },
    {
        title: "환경설정",
        icon: Settings,
        path: "/setting",
    },
];