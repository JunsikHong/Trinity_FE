type Props = {
    label?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SystemTimeInput = ({
    label,
    value,
    onChange
}: Props) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-[9px] font-medium tracking-wider text-zinc-500 uppercase">
                    {label}
                </label>
            )}

            <input
                type="time"
                value={value}
                onChange={onChange}
                className="h-9 border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none focus:border-cyan-500"
            />
        </div>
    );
};

export default SystemTimeInput;