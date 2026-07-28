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
        <div className="absolute right-0 top-14 z-50 w-64 overflow-hidden rounded-lg border border-border bg-surface shadow-xl">

            <div className="border-b border-border px-4 py-3">
                <div className="flex gap-3 items-center">
                    <div className="rounded-full font-bold bg-icon w-12 h-12 flex items-center justify-center text-icon-text">
                        A
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="font-bold text-primary ">
                                {member?.name}님
                            </p>
                            <p className="rounded-2xl bg-icon py-1 flex items-center px-2 text-xs font-semibold text-primary">
                                {member?.departmentName}
                            </p>
                        </div>
                        <p className="mt-1 text-sm text-secondary">
                            {member?.email}
                        </p>
                    </div>
                </div>
                <div 
                    
                    className="bg-icon hover:bg-icon-hover text-icon-text rounded-2xl w-full text-xs px-2 py-1.5 mt-3 flex justify-between items-center cursor-pointer"
                >
                    <span className="flex items-center gap-1">
                        회원님의 권한은 {member?.role} 입니다
                    </span>
                    <ChevronRight size={12} />
                </div>
                <div className="flex flex-col mt-5 border-t border-border">
                    <button
                        onClick={() => {
                            onClose();
                            navigate("/member");
                        }}
                        className="flex gap-0.5 text-sm mt-4 items-center text-primary">
                        <span>내 정보 관리</span>
                        <ChevronRight size={12} />
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onLogout();
                        }}
                        className="flex gap-0.5 text-sm mt-2 items-center text-red-600">
                        <span>로그아웃</span>
                        <ChevronRight size={12} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DefaultMyMenu;