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
    disabled = false,
}: SearchSelectProps) {
    return (
        <select
            name={name}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled}
            className="
                rounded-md
                h-9
                min-w-[95px]
                border border-slate-300
                bg-white
                px-1
                text-sm text-slate-700
                outline-none
                transition-colors
                focus:border-blue-500
                focus:ring-2 focus:ring-blue-100
                disabled:cursor-not-allowed
                disabled:bg-slate-100
                disabled:text-slate-400
            "
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