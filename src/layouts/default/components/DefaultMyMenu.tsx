import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
    member: any;
    onLogout: () => void;
    onClose: () => void;
}

const DefaultMyMenu = ({ member, onLogout, onClose }: Props) => {
    const navigate = useNavigate();

    return (
        <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">

            <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
                <div className="flex gap-3 items-center">
                    <div className="rounded-full font-bold bg-slate-200 w-12 h-12 flex items-center justify-center">
                        A
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="font-bold text-slate-800 ">
                                {member?.name}님
                            </p>
                            <p className="rounded-2xl bg-slate-200 py-1 flex items-center px-2 text-xs font-semibold text-slate-600">
                                {member?.departmentName}
                            </p>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">
                            {member?.email}
                        </p>
                    </div>
                </div>
                <div className="bg-slate-300 rounded-2xl w-full text-xs px-2 py-1.5 mt-3 flex justify-between items-center">
                    <span className="flex items-center gap-1">
                        회원님의 권한은 {member?.role} 입니다
                    </span>
                    <ChevronRight size={12} />
                </div>
                <div className="flex flex-col mt-5 border-t">
                    <button
                        onClick={() => {
                            onClose();
                            navigate("/member");
                        }}
                        className="flex gap-0.5 text-sm mt-2 items-center">
                        <span>내 정보 관리</span>
                        <ChevronRight size={12} />
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onLogout();
                        }}
                        className="flex gap-0.5 text-sm mt-2 items-center text-red-700">
                        <span>로그아웃</span>
                        <ChevronRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DefaultMyMenu;