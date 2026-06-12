interface Option {
    label: string;
    value: string | number;
}

interface SearchSelectProps {
    value?: string | number;
    onChange?: (value: string) => void;
    options: Option[];
    label?: string;
    name?: string;
    disabled?: boolean;
}

export default function SearchSelect({
    value,
    onChange,
    options,
    name,
    disabled = false
}: SearchSelectProps) {
    return (
        <select
            name={name}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
            disabled={disabled}
            className="h-9 w-full border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition-colors focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
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
    );
}