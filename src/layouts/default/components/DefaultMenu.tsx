import {
    Home,
    Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
    open: boolean;
    onClose: () => void;
}

const DefaultMenu = ({ open, onClose }: Props) => {
    if (!open) return null;

    const menus = [
        {
            icon: Home,
            label: "홈",
            to: "/",
        },
        {
            icon: Wrench,
            label: "수리이력",
            to: "/repair",
        },
    ];

    return (
        <div className="absolute right-2 top-16 z-50 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-xs font-semibold tracking-wide text-slate-400">
                    MENU
                </p>
            </div>

            {menus.map(({ icon: Icon, label, to }) => (
                <Link
                    key={label}
                    to={to}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                    <Icon className="h-4 w-4 text-slate-500" />
                    <span>{label}</span>
                </Link>
            ))}
        </div>
    );
};

export default DefaultMenu;