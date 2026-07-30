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

    const [openedMenu, setOpenedMenu] =
        useState<"theme" | "user" | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const themeMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const target = e.target as Node;

            const clickedMenu =
                menuRef.current?.contains(target) ||
                themeMenuRef.current?.contains(target);

            if (!clickedMenu) {
                setOpenedMenu(null);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <header className="flex items-center justify-between bg-surface border-b border-border">
            <div className='flex items-center'>
                <div className='w-16 border-r border-border px-2 py-2 flex justify-center items-center'>
                    <button
                        onClick={onMenuClick}
                        className={`flex items-center rounded-lg px-3 h-10 transition bg-icon hover:bg-icon-hover text-icon-text `}
                    >
                        <Menu className="h-5 w-5 shrink-0" />
                    </button>
                </div>
                <div className="flex items-center gap-2 pl-3 border-r border-border w-36">
                    <img src={logo} alt="AirONE" className="w-8" />
                    <p className="flex flex-col justify-center">
                        <span className="text-lg font-bold text-logo-primary">AirONE</span>
                        <span className="-mt-1 text-[9px] font-semibold text-logo-secondary">
                            REPAIR MANAGE
                        </span>
                    </p>
                </div>
            </div>
            <div className='flex px-3 items-center'>
                <div className="relative flex gap-3 pl-3 text-foreground border-l border-border items-center h-10">
                    <div ref={themeMenuRef} className="relative">
                        <button
                            onClick={() =>
                                setOpenedMenu(prev => prev === "theme" ? null : "theme")
                            }
                            className="flex h-10 items-center gap-2 rounded-lg bg-background px-2 bg-icon hover:bg-icon-hover text-icon-text"
                        >
                            <Settings />
                        </button>
                        <div
                            className={`
                                absolute right-0 top-full mt-2 z-50 origin-top-right
                                transition-all duration-200 ease-out
                                ${openedMenu === "theme"
                                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                                }
                            `}
                        >
                            <DefaultThemeMenu />
                        </div>
                    </div>
                    <div ref={menuRef} className="relative">
                        <button
                            onClick={() =>
                                setOpenedMenu(prev => prev === "user" ? null : "user")
                            }
                            className="flex h-10 items-center gap-2 rounded-lg bg-icon hover:bg-icon-hover text-icon-text px-2"
                        >
                            <p className="flex items-center gap-1 text-left">
                                {member?.role === "ADMIN" ? (
                                    <UserCog size={18} />
                                ) : (
                                    <UserRound size={18} />
                                )}
                                <span className="font-semibold">{member?.name}님</span>
                            </p>

                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${openedMenu === "user" ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        <div
                            className={`
                                absolute right-0 top-full mt-2 origin-top-right z-50
                                transition-all duration-200 ease-out
                                ${openedMenu === "user"
                                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                                }
                            `}
                        >
                            <DefaultMyMenu
                                member={member}
                                onClose={() => setOpenedMenu(null)}
                                onLogout={() => {
                                    setOpenedMenu(null);
                                    logout();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DefaultHeader;