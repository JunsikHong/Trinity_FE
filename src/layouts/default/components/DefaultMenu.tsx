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
            ? "bg-slate-700 text-white"
            : "text-slate-700 hover:bg-slate-700 hover:text-white"
        }
    `;

    return (
        <aside
            className={`flex h-full flex-col border-r border-slate-300 bg-slate-100  ${
                collapsed ? "w-16" : "w-52"
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
                <div className="border-t border-slate-300 p-2 text-[9px] text-center text-slate-500">
                    <span>
                        Copyright © 2026 AirOne All Rights Reserved
                    </span>
                </div>
            )}
        </aside>
    );
};

export default DefaultMenu;