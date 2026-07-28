import { useLocation, useNavigate } from "react-router-dom";
import { MENUS } from "@/constants/menu";

interface DefaultMenuProps {
    collapsed: boolean;
}

const DefaultMenu = ({ collapsed }: DefaultMenuProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuClass = (active: boolean) => `
        flex h-10 cursor-pointer items-center rounded-lg transition
        ${collapsed ? "justify-center" : "px-4"}
        ${active
            ? "bg-menu-active text-menu-text"
            : "text-menu-text hover:bg-menu-hover"
        }
    `;

    return (
        <aside className="relative h-full w-16 shrink-0 border-r border-border bg-surface">
            <div
                className={`absolute left-0 top-0 z-50 flex h-full flex-col border-r border-border bg-surface transition-all duration-300 ${collapsed ? "w-16" : "w-52 shadow-xl"
                    }`}
            >
                <nav className="flex-1 space-y-1 p-2">
                    {MENUS.map(({ title, path, icon: Icon }) => (
                        <div
                            key={path}
                            onClick={() => navigate(path)}
                            className={menuClass(location.pathname === path)}
                        >
                            <Icon className="h-5 w-5 shrink-0" />

                            {!collapsed && (
                                <span className="ml-3 text-sm">{title}</span>
                            )}
                        </div>
                    ))}
                </nav>

                {!collapsed && (
                    <div className="border-t border-border p-2 text-center text-[9px] text-secondary">
                        Copyright © 2026 AirOne All Rights Reserved
                    </div>
                )}
            </div>
        </aside>
    );
};

export default DefaultMenu;