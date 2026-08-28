import { useStatusStore } from "@/store/statusStore";
import { Moon, Sun } from "lucide-react";

const DefaultThemeMenu = () => {

    // TODO
    // 3D 모델 도구 설정 추가

    const {
        themeStatus,
        toggleThemeStatus,
        raycastStatus,
        toggleRaycastStatus,
    } = useStatusStore();

    return (
        <div className="w-72 overflow-hidden rounded-lg border border-border bg-surface shadow-xl p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center w-full">
                <div className="text-primary">
                    테마설정
                </div>
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
            <div className="flex justify-between items-center w-full">
                <div className="text-primary">
                    레이캐스트설정
                </div>
                <button
                    onClick={toggleRaycastStatus}
                    className={`
                        relative flex h-8 w-16 items-center rounded-full
                        transition-colors duration-300
                        ${raycastStatus === false
                            ? "bg-slate-300"
                            : "bg-blue-600"}
                    `}
                >
                    <div
                        className={`
                            absolute left-1 flex h-6 w-6 items-center justify-center
                            rounded-full bg-white shadow-md
                            transition-transform duration-300
                            ${raycastStatus === true
                                ? "translate-x-8"
                                : "translate-x-0"}
                        `}
                    >
                    </div>
                </button>
            </div>
        </div>
    );
};

export default DefaultThemeMenu;