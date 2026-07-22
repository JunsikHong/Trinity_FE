import { ChevronRight, LogOut, UserCircle } from "lucide-react";

// hooks
import { useMember } from "@/hooks/member/useMember";
import { useLogout } from "@/hooks/member/useLogout";

interface Props {
    open: boolean;
    onClose: () => void;
}

const DefaultMyMenu = ({ open }: Props) => {
    if (!open) return null;

    const { data: member } = useMember();
    const logout = useLogout();

    return (
        <div className="absolute right-2 top-16 z-50 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-xs text-slate-500">{member?.departmentName}</p>
                <p className="font-semibold text-slate-800">{member?.name}</p>
            </div>
            <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50">
                <div className="flex items-center gap-3">
                    <UserCircle size={18} />
                    <span>회원정보</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
            </div>
            <button
                onClick={logout}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50"
            >
                <LogOut size={18} />
                <span>로그아웃</span>
            </button>
        </div>
    );
};

export default DefaultMyMenu;