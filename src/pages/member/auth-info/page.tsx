import { ShieldCheck } from "lucide-react";
import { useMember } from "@/hooks/member/useMember";

const ROLE_INFO = {
    ADMIN: {
        label: "ADMIN",
        permissions: [
            "시스템의 모든 기능 사용",
            "회원 관리",
            "항공기 관리",
            "정비 항목 관리",
            "정비 기록 등록 / 수정 / 삭제",
            "권한 관리",
            "환경설정 관리",
        ],
    },
    EDITOR: {
        label: "EDITOR",
        permissions: [
            "정비 기록 조회",
            "정비 기록 등록",
            "정비 기록 수정",
            "항공기 정보 조회",
        ],
    },
    VIEWER: {
        label: "VIEWER",
        permissions: [
            "정비 기록 조회",
            "항공기 정보 조회",
            "데이터 검색",
        ],
    },
} as const;

const AuthInfoPage = () => {
    const { data: member } = useMember();

    const current =
        ROLE_INFO[(member?.role as keyof typeof ROLE_INFO) ?? "VIEWER"];

    return (
        <div className="p-6 text-primary">
            {/* Header */}
            <div className="flex items-center gap-2">
                <ShieldCheck
                    size={22}
                    className="text-secondary"
                />

                <h2 className="text-xl font-bold">
                    권한 안내
                </h2>
            </div>


            {/* Current Role */}
            <div className="mt-6 rounded-xl border border-border bg-card p-5">
                <p className="text-sm text-muted">
                    회원님의 현재 권한은
                </p>

                <div className="mt-3 inline-flex rounded-lg bg-primaryBtn px-4 py-2 text-sm font-semibold text-menu-text">
                    {current.label}
                </div>
            </div>


            {/* Current Permission */}
            <div className="mt-6">
                <h3 className="font-semibold text-primary">
                    현재 권한으로 가능한 기능
                </h3>

                <ul className="mt-3 space-y-2">
                    {current.permissions.map((permission) => (
                        <li
                            key={permission}
                            className="flex items-center gap-2 text-sm text-secondary"
                        >
                            <span className="h-1.5 w-1.5 rounded-full bg-primaryBtn" />
                            {permission}
                        </li>
                    ))}
                </ul>
            </div>


            {/* All Role */}
            <div className="mt-8 border-t border-border pt-6">
                <h3 className="font-semibold text-primary">
                    권한별 기능
                </h3>

                <div className="mt-4 space-y-5">
                    {Object.values(ROLE_INFO).map((role) => (
                        <div
                            key={role.label}
                            className="rounded-xl border border-border bg-card p-4"
                        >
                            <div className="inline-flex rounded-lg bg-menu px-3 py-1 text-sm font-semibold text-menu-text">
                                {role.label}
                            </div>

                            <ul className="mt-3 space-y-1">
                                {role.permissions.map((permission) => (
                                    <li
                                        key={permission}
                                        className="text-sm text-secondary"
                                    >
                                        • {permission}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AuthInfoPage;