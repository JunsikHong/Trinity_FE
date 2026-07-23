import { User, KeyRound, LogOut, X, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
    member: any;
    onLogout: () => void;
    onClose: () => void;
}

const DefaultMyMenu = ({ member, onLogout, onClose }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">

            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex gap-2 items-center">
                    <p className="font-semibold text-slate-800 text-sm">
                        {member?.name}님
                    </p>
                    <p className="inline-block rounded-2xl bg-slate-200 px-2 py-1 text-[8px] font-semibold text-slate-600">
                        {member?.departmentName}
                    </p>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                    {member?.email}
                </p>
                <div className="bg-slate-300 rounded-xl w-full text-[9px] px-2 py-1 mt-1 flex justify-between items-center">
                    <span className="flex items-center gap-1">
                        회원님의 권한은 {member.role} 입니다 
                    </span>
                    <ChevronRight size={8}/>
                </div>
                <div className="flex flex-col mt-5 border-t">
                    <button 
                        onClick={() => navigate("/member")}
                        className="flex gap-0.5 text-xs mt-2 items-center">
                        <span>내 정보 관리</span>
                        <ChevronRight size={10} />
                    </button>
                    <button 
                        onClick={onLogout}
                        className="flex gap-0.5 text-xs mt-2 items-center text-red-700">
                        <span>로그아웃</span>
                        <ChevronRight size={10} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DefaultMyMenu;