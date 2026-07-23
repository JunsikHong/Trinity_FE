import logo from '@/assets/logo.png';
import { Menu, LogOut, User, ChevronDown } from "lucide-react";
import { useMember } from "@/hooks/member/useMember";
import { useLogout } from "@/hooks/member/useLogout";
import { useEffect, useRef, useState } from "react";
import DefaultMyMenu from "@/layouts/default/components/DefaultMyMenu";

const DefaultHeader = ({ onMenuClick }: any) => {
    const logout = useLogout();
    const { data: member } = useMember();

    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header className="flex items-center justify-between bg-slate-100 border-b border-slate-300">
            <div className='flex items-center'>
                <div className='w-16 border-r border-slate-300 px-2 py-2 flex justify-center items-center'>
                    <button
                        onClick={onMenuClick}
                        className={`flex items-center rounded-lg px-3 h-10 transition bg-slate-300 text-slate-800 hover:bg-slate-400`}
                    >
                        <Menu className="h-5 w-5 shrink-0" />
                    </button>
                </div>
                <div className="flex items-center gap-2 pl-3 border-r border-slate-300 w-36">
                    <img src={logo} alt="AirONE" className="w-8" />
                    <p className="flex flex-col justify-center text-slate-700">
                        <span className="text-lg font-bold">AirONE</span>
                        <span className="-mt-1 text-[9px] font-semibold text-slate-400">
                            REPAIR MANAGE
                        </span>
                    </p>
                </div>
            </div>
            <div className='flex px-3 items-center'>
                <div
                    ref={menuRef}
                    className="relative flex gap-1 pl-3 text-slate-700 border-l border-slate-300 items-center h-10"
                >
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex h-10 items-center gap-2 rounded-lg bg-slate-300 px-2 hover:bg-slate-400"
                    >
                        <p className="flex flex-col text-left">
                            <span className="text-xs font-semibold">
                                {member?.name}님
                            </span>
                            <span className="text-[10px] text-slate-600">
                                {member?.email}
                            </span>
                        </p>
                        <ChevronDown
                            size={16}
                            className={`transition-transform ${open ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                    {open && (
                        <DefaultMyMenu
                            member={member}
                            onClose={() => setOpen(false)}
                            onLogout={() => {
                                setOpen(false);
                                logout();
                            }}
                        />
                    )}
                </div>
            </div>
        </header>
    );
};

export default DefaultHeader;