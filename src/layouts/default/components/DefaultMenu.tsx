import { LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { MENUS } from "@/constants/menu";
import { useLogout } from "@/hooks/member/useLogout";

interface DefaultMenuProps {
    collapsed: boolean;
}

const DefaultMenu = ({ collapsed }: DefaultMenuProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();

    const menuClass = (active: boolean) => `
        flex h-10 cursor-pointer items-center rounded-lg transition
        ${collapsed ? "justify-center" : "px-4"}
        ${
            active
                ? "bg-slate-700 text-white"
                : "text-slate-700 hover:bg-slate-700 hover:text-white"
        }
    `;

    return (
        <aside
            className={`flex h-full flex-col border-r border-slate-300 bg-slate-100 transition-all duration-300 ${
                collapsed ? "w-16" : "w-48"
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
            <div className="border-t border-slate-300 p-2">
                <div
                    onClick={logout}
                    className={menuClass(false)}
                >
                    <LogOut className="h-5 w-5 shrink-0" />
                    {!collapsed && (
                        <span className="ml-3 text-sm">로그아웃</span>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default DefaultMenu;