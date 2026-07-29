import { useEffect, useState } from "react";
import { useStatusStore } from "@/store/statusStore";
import SystemInput from "@/common/ui/SystemInput";
import { Moon, Sun, Check } from "lucide-react";

const DefaultThemeMenu = () => {
    const {
        themeStatus,
        toggleThemeStatus,
        listWidth,
        viewWidth,
        setListWidth,
        setViewWidth,
    } = useStatusStore();

    const [tempListWidth, setTempListWidth] = useState(listWidth);
    const [tempViewWidth, setTempViewWidth] = useState(viewWidth);


    useEffect(() => {
        setTempListWidth(listWidth);
        setTempViewWidth(viewWidth);
    }, [listWidth, viewWidth]);


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
            <div className="flex items-center justify-between gap-20">
                <span className="text-primary">
                    목록넓이
                </span>
                <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1">
                        <SystemInput
                            value={tempListWidth}
                            onChange={(e) =>
                                setTempListWidth(Number(e.target.value))
                            }
                        />
                        <span className="
                            absolute right-3 top-1/2 mt-0.5
                            -translate-y-1/2
                            text-xs text-muted
                            pointer-events-none
                        ">
                            %
                        </span>
                    </div>
                    <button
                        onClick={() => setListWidth(tempListWidth)}
                        className="
                            flex h-9 w-9 items-center justify-center mt-1
                            rounded-lg bg-primaryBtn
                            text-white
                            transition
                            hover:bg-primaryBtn-hover
                        "
                    >
                        <Check size={16} />
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-between gap-20">
                <span className="text-primary">
                    상세넓이
                </span>
                <div className="flex flex-1 items-center gap-2">
                    <div className="relative flex-1">
                        <SystemInput
                            value={tempViewWidth}
                            onChange={(e) =>
                                setTempViewWidth(Number(e.target.value))
                            }
                        />
                        <span className="
                            absolute right-3 top-1/2 mt-0.5
                            -translate-y-1/2
                            text-xs text-muted
                            pointer-events-none
                        ">
                            %
                        </span>
                    </div>
                    <button
                        onClick={() => setViewWidth(tempViewWidth)}
                        className="
                            flex h-9 w-9 items-center justify-center mt-1
                            rounded-lg bg-primaryBtn
                            text-white
                            transition
                            hover:bg-primaryBtn-hover
                        "
                    >
                        <Check size={16} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default DefaultThemeMenu;