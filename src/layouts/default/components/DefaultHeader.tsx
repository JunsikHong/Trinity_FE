import logo from '@/assets/logo.png';
import { Menu, ChevronDown, UserRound, UserCog, Settings } from "lucide-react";
import { useMember } from "@/hooks/member/useMember";
import { useLogout } from "@/hooks/member/useLogout";
import { useEffect, useRef, useState } from "react";
import DefaultMyMenu from "@/layouts/default/components/DefaultMyMenu";
import DefaultThemeMenu from "@/layouts/default/components/DefaultThemeMenu";

const DefaultHeader = ({ onMenuClick }: any) => {
    const logout = useLogout();
    const { data: member } = useMember();

    const [open, setOpen] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);
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
        <header className="flex items-center justify-between bg-background border-b border-border">
            <div className='flex items-center'>
                <div className='w-16 border-r border-border px-2 py-2 flex justify-center items-center'>
                    <button
                        onClick={onMenuClick}
                        className={`flex items-center rounded-lg px-3 h-10 transition bg-background text-foreground hover:bg-slate-400`}
                    >
                        <Menu className="h-5 w-5 shrink-0" />
                    </button>
                </div>
                <div className="flex items-center gap-2 pl-3 border-r border-border w-36">
                    <img src={logo} alt="AirONE" className="w-8" />
                    <p className="flex flex-col justify-center text-foreground">
                        <span className="text-lg font-bold">AirONE</span>
                        <span className="-mt-1 text-[9px] font-semibold text-muted-foreground">
                            REPAIR MANAGE
                        </span>
                    </p>
                </div>
            </div>
            <div className='flex px-3 items-center'>
                <div
                    className="relative flex gap-1 pl-3 text-foreground border-l border-border items-center h-10"
                >
                    <div>
                        <button
                            onClick={() => setThemeOpen((prev) => !prev)}
                            className="flex h-10 items-center gap-2 rounded-lg bg-background px-2 hover:hover"
                        >
                            <Settings/>
                        </button>
                        {themeOpen && (
                            <DefaultThemeMenu
                            />
                        )}
                    </div>
                    <div
                        ref={menuRef}
                    >
                        <button
                            onClick={() => setOpen((prev) => !prev)}
                            className="flex h-10 items-center gap-2 rounded-lg bg-slate-300 px-2 hover:bg-slate-400"
                        >
                            <p className="flex items-center gap-1 text-left">
                                {member?.role == 'ADMIN' ? <UserCog size={18}/> : <UserRound size={18}/>}
                                <span className="font-semibold">
                                    {member?.name}님
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
            </div>
        </header>
    );
};

export default DefaultHeader;