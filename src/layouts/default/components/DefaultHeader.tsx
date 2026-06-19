import logo from '@/assets/logo.png';
import { LogOut } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";

import { useMember } from "@/hooks/useMember";
import { useLogout } from "@/hooks/useLogout";

const DefaultHeader = () => {
    // const location = useLocation();
    // const navigate = useNavigate();

    const logout = useLogout();
    const { data: member } = useMember();

    // const isDashboard = location.pathname.startsWith("/dashboard");
    // const isMain = location.pathname === "/";

    return (
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-2">
            <div className="flex items-center gap-2 p-2">
                <img src={logo} alt="" className='w-[40px]' />
                <p className="flex flex-col">
                    <span className='text-slate-400 text-xs font-semibold'>Maintanence System</span>
                    <span className='text-lg font-bold'>AirONE</span>
                </p>
            </div>
            {/* <div className='flex h-full'>
                <button
                    onClick={() => navigate("/dashboard")}
                    className={`h-full px-6 font-semibold transition-all duration-200 border-b-2 ${isDashboard
                            ? "border-blue-600 text-blue-600 "
                            : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 "
                        }`}
                >
                    대시보드
                </button>
                <button
                    onClick={() => navigate("/")}
                    className={`h-full px-6 font-semibold transition-all duration-200 border-b-2 ${isMain
                            ? "border-blue-600 text-blue-600 "
                            : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 "
                        }`}
                >
                    메인
                </button>
            </div> */}
            <div className="flex items-center gap-3 p-2">
                <div className="flex flex-col items-end">
                    <p className="font-semibold text-sm">{member?.departmentName}</p>
                    <p className="text-xs text-slate-500">{member?.name}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold">
                    {member?.name?.charAt(0)}
                </div>
                <button
                    onClick={logout}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                >
                    <LogOut size={16} />
                    <span>로그아웃</span>
                </button>
            </div>
        </header>
    );
}

export default DefaultHeader;