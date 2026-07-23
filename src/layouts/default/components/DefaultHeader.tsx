import logo from '@/assets/logo.png';
import { Menu } from "lucide-react";

const DefaultHeader = ({ onMenuClick } : any) => {
    return (
        <header className="flex items-center bg-slate-100 border-b border-slate-300">
            <div className='w-16 border-r border-slate-300 px-2 py-2 flex justify-center items-center'>
                <button
                    onClick={onMenuClick}
                    className={`flex items-center rounded-lg px-3 h-10 transition bg-slate-300 text-slate-800 hover:bg-slate-400`}
                >
                    <Menu className="h-5 w-5 shrink-0" />
                </button>
            </div>
            <div className="flex items-center gap-2 ml-3">
                <img src={logo} alt="AirONE" className="w-8" />
                <p className="flex flex-col justify-center text-slate-700">
                    <span className="text-lg font-bold">AirONE</span>
                    <span className="-mt-1 text-[9px] font-semibold text-slate-400">
                        REPAIR MANAGE
                    </span>
                </p>
            </div>
        </header>
    );
};

export default DefaultHeader;