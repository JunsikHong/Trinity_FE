interface SystemInputProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    label?: string;
    name?: string;
    disabled?: boolean;
}

export default function SystemInput({
    value,
    onChange,
    placeholder,
    label,
    name,
    disabled = false
}: SystemInputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-[9px] font-medium tracking-wider text-zinc-500 uppercase">
                    {label}
                </label>
            )}

            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className="h-9 border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
        </div>
    );
}