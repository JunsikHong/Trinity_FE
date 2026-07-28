import { useStatusStore } from "@/store/statusStore";
import { Moon, Sun } from 'lucide-react';

const DefaultThemeMenu = () => {

    const { themeStatus, toggleThemeStatus } = useStatusStore();

    return (
        <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">

            <button
                onClick={toggleThemeStatus}
                className={`
                relative flex h-8 w-16 items-center rounded-full
                transition-colors duration-300
                ${themeStatus === "dark"
                        ? "bg-slate-700"
                        : "bg-slate-300"}
            `}
            >
                <div
                    className={`
                    absolute left-1 flex h-6 w-6 items-center justify-center
                    rounded-full bg-white shadow-md
                    transition-transform duration-300
                    ${themeStatus === "dark"
                            ? "translate-x-8"
                            : "translate-x-0"}
                `}
                >
                    {themeStatus === "dark" ? (
                        <Moon size={14} className="text-slate-700" />
                    ) : (
                        <Sun size={14} className="text-yellow-500" />
                    )}
                </div>
            </button>
        </div>
    );
};

export default DefaultThemeMenu;