type SystemToggleSwitchProps = {
    checked?: boolean;
    onChange?: (value: boolean) => void;
    leftLabel?: string;
    rightLabel?: string;
};

const SystemToggleSwitch = ({
    checked = false,
    onChange,
    leftLabel = "OFF",
    rightLabel = "ON",
}: SystemToggleSwitchProps) => {
    return (
        <button
            type="button"
            onClick={() => onChange?.(!checked)}
            className="relative flex h-8 w-24 items-center rounded-full bg-slate-200 p-0.5"
        >
            <div
                className={`absolute h-7 w-[46px] rounded-full bg-blue-600 shadow-sm transition-all duration-300 ${
                    checked ? "translate-x-[46px]" : "translate-x-0"
                }`}
            />

            <div className="relative z-10 flex w-full">
                <div
                    className={`flex flex-1 items-center justify-center text-xs font-semibold ${
                        !checked ? "text-white" : "text-slate-600"
                    }`}
                >
                    {leftLabel}
                </div>

                <div
                    className={`flex flex-1 items-center justify-center text-xs font-semibold ${
                        checked ? "text-white" : "text-slate-600"
                    }`}
                >
                    {rightLabel}
                </div>
            </div>
        </button>
    );
};

export default SystemToggleSwitch;