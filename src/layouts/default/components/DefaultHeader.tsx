import logo from '@/assets/logo.png';
import { User, Menu } from "lucide-react";
import { useState } from "react";

// components
import DefaultMenu from '@/layouts/default/components/DefaultMenu';
import DefaultMyMenu from '@/layouts/default/components/DefaultMyMenu';

const DefaultHeader = () => {
    const [myMenuOpen, setMyMenuOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-2 relative">
            <div className="flex items-center gap-2 p-2">
                <img src={logo} alt="" className='w-[40px]' />
                <p className="flex flex-col justify-center items-center">
                    <span className='text-lg font-bold'>AirONE</span>
                    <span className='-mt-1 text-slate-400 text-[9px] font-semibold'>REPAIR MANAGE</span>
                </p>
            </div>
            <div className="flex items-center gap-3 p-2">
                <button
                    onClick={() => setMyMenuOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-200"
                >
                    <User className="h-5 w-5 text-slate-600" />
                </button>
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition hover:bg-slate-50"
                >
                    <Menu className="h-5 w-5 text-slate-700" />
                </button>
            </div>
            <DefaultMyMenu
                open={myMenuOpen}
                onClose={() => setMyMenuOpen(false)}
            />
            <DefaultMenu
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            />
        </header>
    );
}

export default DefaultHeader;