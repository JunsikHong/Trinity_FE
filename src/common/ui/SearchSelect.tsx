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
    className?: string;
}

export default function SearchSelect({
    value,
    onChange,
    options,
    label,
    name,
    disabled = false,
    className = "",
}: SearchSelectProps) {
    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-xs font-medium text-input-text">
                    {label}
                </label>
            )}
            <select
                name={name}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                disabled={disabled}
                className={`
                    rounded-md
                    h-9
                    min-w-[95px]
                    border
                    border-input-border
                    bg-input
                    px-1
                    text-sm text-input-text
                    transition-colors
                    focus:border-input-focus
                    focus:ring-2 
                    disabled:cursor-not-allowed
                    disabled:bg-input-disabled
                    disabled:text-slate-400
                    ${className}
                `}
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