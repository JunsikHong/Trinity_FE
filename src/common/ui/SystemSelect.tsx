interface Option {
    label: string;
    value: string | number;
}

interface SystemSelectProps {
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    label?: string;
    name?: string;
    disabled?: boolean;
}

export default function SystemSelect({
    value,
    onChange,
    options,
    label,
    name,
    disabled = false
}: SystemSelectProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-[9px] font-medium tracking-wider text-zinc-500 uppercase">
                    {label}
                </label>
            )}

            <select
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="h-9 border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition-colors focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}