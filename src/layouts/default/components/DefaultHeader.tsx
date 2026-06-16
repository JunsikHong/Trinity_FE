import logo from '@/assets/logo.png';
import { useLocation, useNavigate } from "react-router-dom";

const DefaultHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isDashboard = location.pathname.startsWith("/dashboard");
    const isMain = location.pathname === "/";

    return (
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-2">
            <div className="flex items-center gap-2 p-2">
                <img src={logo} alt="" className='w-[40px]' />
                <p className="flex flex-col">
                    <span className='text-slate-400 text-xs font-semibold'>Maintanence System</span>
                    <span className='text-lg font-bold'>AirONE</span>
                </p>
            </div>
            <div className='flex h-full'>
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
            </div>
            <div className="flex items-center gap-3 p-2">
                <div className="flex flex-col items-end">
                    <p className="font-semibold text-sm">트리니티 정비팀</p>
                    <p className="text-xs text-slate-500">팀장/홍민식</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold">
                    H
                </div>
            </div>
        </header>
    );
}

export default DefaultHeader;